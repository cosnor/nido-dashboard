import fs from "fs";
import axios from "axios";

// =========================
// CONFIG
// =========================

const INPUT = "data_links.ts";
const OUTPUT = "birds_completed.json";

const api = axios.create({
  headers: {
    "User-Agent": "BirdDatasetBuilder/1.0"
  },
  timeout: 15000
});

// =========================
// UTILIDADES
// =========================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function safeGet(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await api.get(url);
    } catch (err) {
      const status = err.response?.status;

      if (status === 429) {
        console.log("429 Rate Limit -> esperando 3s...");
        await sleep(3000);
        continue;
      }

      if (status === 404) {
        return null;
      }

      console.log("ERROR REQUEST:", status);
      throw err;
    }
  }

  return null;
}

// =========================
// OBTENER INFO DE AVE
// =========================

async function getBirdInfo(scientificName) {
  try {
    const wikiTitle = scientificName.replace(/ /g, "_");

    // =========================
    // WIKIPEDIA SUMMARY
    // =========================

    const wikiUrl =
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`;

    const wikiRes = await safeGet(wikiUrl);

    if (!wikiRes) {
      console.log("No encontrada:", scientificName);
      return null;
    }

    const data = wikiRes.data;

    // =========================
    // NOMBRE COMUN
    // =========================

    let commonName = scientificName;

    if (
      data.title &&
      data.title.toLowerCase() !== scientificName.toLowerCase()
    ) {
      commonName = data.title;
    }

    // =========================
    // IMAGEN
    // =========================

    const imageUrl =
      data.originalimage?.source ||
      data.thumbnail?.source ||
      "";

    // =========================
    // WIKIDATA
    // =========================

    const wikidataId = data.wikibase_item;

    let family = "Unknown";

    if (wikidataId) {
      const entityUrl =
        `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`;

      const entityRes = await safeGet(entityUrl);

      if (entityRes) {
        const entity =
          entityRes.data.entities[wikidataId];

        // =========================
        // FAMILY
        // =========================

        const parentTaxon =
          entity.claims?.P171?.[0]?.mainsnak?.datavalue?.value?.id;

        if (parentTaxon) {
          const parentUrl =
            `https://www.wikidata.org/wiki/Special:EntityData/${parentTaxon}.json`;

          const parentRes = await safeGet(parentUrl);

          if (parentRes) {
            const parentEntity =
              parentRes.data.entities[parentTaxon];

            family =
              parentEntity.labels?.la?.value ||
              parentEntity.labels?.en?.value ||
              "Unknown";
          }
        }
      }
    }

    // =========================
    // RESULTADO
    // =========================

    return {
      scientificName,
      name: commonName,
      imageUrl,
      wikipediaUrl:
        `https://en.wikipedia.org/wiki/${wikiTitle}`,
      family,
      conservationStatus: "LC"
    };

  } catch (err) {
    console.log("ERROR:", scientificName);
    return null;
  }
}

// =========================
// MAIN
// =========================

async function main() {

  // Leer archivo
  const content = fs.readFileSync(INPUT, "utf8");

  // Extraer nombres científicos
  const matches = [
    ...content.matchAll(
      /"scientificName":\s*"([^"]+)"/g
    )
  ];

  const names = matches.map(m => m[1]);

  console.log("Total especies:", names.length);

  const birds = [];

  for (const name of names) {

    console.log("\nProcesando:", name);

    const bird = await getBirdInfo(name);

    if (bird) {
      birds.push(bird);
      console.log("OK");
    } else {
      console.log("FAIL");
    }

    // Esperar para evitar rate limit
    await sleep(1200);
  }

  // Guardar resultado
  fs.writeFileSync(
    OUTPUT,
    JSON.stringify(birds, null, 2),
    "utf8"
  );

  console.log("\nFINALIZADO");
  console.log("Guardado en:", OUTPUT);
}

main();