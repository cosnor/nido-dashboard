export interface Bird {
  scientificName: string;
  name: string;
  imageUrl: string;
  wikipediaUrl: string;
  family: string;
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD';
}

export const birds: Bird[] = [
  {
    "scientificName": "Acropternis orthonyx",
    "name": "Ocellated tapaculo",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Acropternis_orthonyx_173294293.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Acropternis_orthonyx",
    "family": "Acropternis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Amazona farinosa",
    "name": "Mealy amazon",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Mealy_Parrot%2C_Peru.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Amazona_farinosa",
    "family": "Amazona",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Andigena nigrirostris",
    "name": "Black-billed mountain toucan",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/37/Black-billed-Mountain-Toucan.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Andigena_nigrirostris",
    "family": "Andigena",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Arremon assimilis",
    "name": "Grey-browed brushfinch",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/72/Grey-browed_brushfinch_%28Arremon_assimilis_assimilis%29_Caldas.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Arremon_assimilis",
    "family": "Arremon",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Arremon brunneinucha",
    "name": "Chestnut-capped brushfinch",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Chestnut-capped_brushfinch_%28Arremon_brunneinucha_elsae%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Arremon_brunneinucha",
    "family": "Arremon",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Atlapetes pallidinucha",
    "name": "Pale-naped brushfinch",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/94/Pale-naped_brushfinch_%28Atlapetes_pallidinucha_pallidinucha%29_Cundinamarca.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Atlapetes_pallidinucha",
    "family": "Atlapetes",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Atlapetes schistaceus",
    "name": "Slaty brushfinch",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Slaty_brushfinch_%28Atlapetes_schistaceus_schistaceus%29_Caldas.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Atlapetes_schistaceus",
    "family": "Atlapetes",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Aulacorhynchus albivitta",
    "name": "Southern emerald toucanet",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Aulacorhynchus_albivitta_%2814458390459%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Aulacorhynchus_albivitta",
    "family": "Aulacorhynchus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Basileuterus tristriatus",
    "name": "Three-striped warbler",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Three-striped_Warbler_-_Chiv%C3%AD_Tres_Rayas_%28Basileuterus_tristriatus_bessereri%29_%2814259290176%29.jpg/3840px-Three-striped_Warbler_-_Chiv%C3%AD_Tres_Rayas_%28Basileuterus_tristriatus_bessereri%29_%2814259290176%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Basileuterus_tristriatus",
    "family": "Basileuterus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cantorchilus leucotis",
    "name": "Buff-breasted wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Cantorchilus_leucotis-Buff-breasted_Wren.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cantorchilus_leucotis",
    "family": "Cantorchilus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Catharus aurantiirostris",
    "name": "Orange-billed nightingale-thrush",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Orange-billed_Nightingale-Thrush%2C_La_Concordia%2C_Mexico_%2817001712972%29.jpg/3840px-Orange-billed_Nightingale-Thrush%2C_La_Concordia%2C_Mexico_%2817001712972%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Catharus_aurantiirostris",
    "family": "Catharus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cercomacra nigricans",
    "name": "Jet antbird",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Jet_Antbird_-_Colombia_S4E9202_%2816823101325%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cercomacra_nigricans",
    "family": "Cercomacra",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cercomacroides parkeri",
    "name": "Parker's antbird",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/47/Cercomacra_parkeri_%28Parker%27s_Antbird%29_%287171434918%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cercomacroides_parkeri",
    "family": "Cercomacra",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cercomacroides tyrannina",
    "name": "Dusky antbird",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/af/Cercomacra_tyrannina_-_Dusky_Antbird_%28male%29_%28cropped%29.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cercomacroides_tyrannina",
    "family": "Cercomacra",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Chlorospingus flavopectus",
    "name": "Common chlorospingus",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Common_bush_tanager_%28Chlorospingus_flavopectus_regionalis%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Chlorospingus_flavopectus",
    "family": "Chlorospingus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cinnycerthia olivascens",
    "name": "Sepia-brown wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/Cinnycerthia_olivascens.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cinnycerthia_olivascens",
    "family": "Cinnycerthia",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cistothorus apolinari",
    "name": "Apolinar's wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Cistothorus_apolinari_%2817186001322%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cistothorus_apolinari",
    "family": "Cistothorus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cistothorus platensis",
    "name": "Grass wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Grass_wren_%28Cistothorus_platensis_aequatorialis%29_Caldas.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cistothorus_platensis",
    "family": "Cistothorus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Coereba flaveola",
    "name": "Bananaquit",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Bananaquits.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Coereba_flaveola",
    "family": "Coereba",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Colibri coruscans",
    "name": "Sparkling violetear",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Sparkling_violetear_%28Colibri_coruscans_coruscans%29_Cundinamarca.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Colibri_coruscans",
    "family": "Colibri",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Colibri cyanotus",
    "name": "Lesser violetear",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/38/Lesser_violetear_%28Colibri_cyanotus_cabanidis%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Colibri_cyanotus",
    "family": "Colibri",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Crotophaga ani",
    "name": "Smooth-billed ani",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Smooth-billed_ani_%28Crotophaga_ani%29_GC.JPG/3840px-Smooth-billed_ani_%28Crotophaga_ani%29_GC.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Crotophaga_ani",
    "family": "Crotophaga",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Crypturellus cinereus",
    "name": "Cinereous tinamou",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Crypturellus_cinereus.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Crypturellus_cinereus",
    "family": "Crypturellus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cyanocorax affinis",
    "name": "Black-chested jay",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Cyanocorax_affinis.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cyanocorax_affinis",
    "family": "Cyanocorax",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cyanocorax yncas",
    "name": "Inca jay",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Inca_jay_%28Cyanocorax_yncas_yncas%29_San_Isidro.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cyanocorax_yncas",
    "family": "Cyanocorax",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cyanolyca armillata",
    "name": "Black-collared jay",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Cyanolyca_armillata.jpg/960px-Cyanolyca_armillata.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cyanolyca_armillata",
    "family": "Cyanolyca",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cyclarhis nigrirostris",
    "name": "Black-billed peppershrike",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Black-billed_peppershrike_%28Cyclarhis_nigrirostris%29_San_Isidro.jpg/3840px-Black-billed_peppershrike_%28Cyclarhis_nigrirostris%29_San_Isidro.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cyclarhis_nigrirostris",
    "family": "Cyclarhis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Cyphorhinus thoracicus",
    "name": "Southern chestnut-breasted wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Cyphorhinus_thoracicus_Tschudi_1846.png",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Cyphorhinus_thoracicus",
    "family": "Cyphorhinus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Elaenia frantzii",
    "name": "Mountain elaenia",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Mountain_Elaenia_-_Colombia_S4E2481.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Elaenia_frantzii",
    "family": "Elaenia",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Formicivora intermedia",
    "name": "Northern white-fringed antwren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Northern_White-fringed_Antwren_-_Coicorita_%28Formicivora_grisea_intermedia%29_%2823558650251%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Formicivora_intermedia",
    "family": "Formicivora",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Grallaria bangsi",
    "name": "Santa Marta antpitta",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Santa_Marta_Antpitta_-_Shreeram_M_V_-_2025.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Grallaria_bangsi",
    "family": "Grallaria",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Grallaria quitensis",
    "name": "Tawny antpitta",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/71/Tawny_Antpitta.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Grallaria_quitensis",
    "family": "Grallaria",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Grallaria ruficapilla",
    "name": "Chestnut-crowned antpitta",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Chestnut-crowned_antpitta_%28Grallaria_ruficapilla_ruficapilla%29_Caldas.jpg/3840px-Chestnut-crowned_antpitta_%28Grallaria_ruficapilla_ruficapilla%29_Caldas.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Grallaria_ruficapilla",
    "family": "Grallaria",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Grallaricula nana",
    "name": "Slaty-crowned antpitta",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/91/Slaty-crowned_antpitta_%28Grallaricula_nana_occidentalis%29_Caldas.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Grallaricula_nana",
    "family": "Grallaricula",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Henicorhina leucophrys",
    "name": "Grey-breasted wood wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gray-breasted_Wood-Wren_-_Colombia_S4E9753_%2816982145839%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Henicorhina_leucophrys",
    "family": "Henicorhina",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Henicorhina leucosticta",
    "name": "White-breasted wood wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/97/Henicorhina_leucosticta_-_White-breasted_Wood_Wren%3B_Balbina%2C_Amazonas%2C_Brazil.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Henicorhina_leucosticta",
    "family": "Henicorhina",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Henicorhina negreti",
    "name": "Munchique wood wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Munchique_Wood-Wren.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Henicorhina_negreti",
    "family": "Henicorhina",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Icterus chrysater",
    "name": "Yellow-backed oriole",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Toche_Pareja.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Icterus_chrysater",
    "family": "Icterus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Lophotriccus pileatus",
    "name": "Scale-crested pygmy tyrant",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Scale-crested_Pygmy-Tirant.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Lophotriccus_pileatus",
    "family": "Lophotriccus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Mecocerculus leucophrys",
    "name": "White-throated tyrannulet",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4f/White-throated_tyrannulet_%28Mecocerculus_leucophrys_setophagoides%29_Cundinamarca.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Mecocerculus_leucophrys",
    "family": "Mecocerculus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Metallura tyrianthina",
    "name": "Tyrian metaltail",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tyrian_metaltail_%28Metallura_tyrianthina_tyrianthina%29_Cundinamarca.jpg/3840px-Tyrian_metaltail_%28Metallura_tyrianthina_tyrianthina%29_Cundinamarca.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Metallura_tyrianthina",
    "family": "Metallura",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Mimus gilvus",
    "name": "Tropical mockingbird",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9e/TropicalMockingbird.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Mimus_gilvus",
    "family": "Mimus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Myadestes ralloides",
    "name": "Andean solitaire",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Myadestes_ralloides_75757649.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Myadestes_ralloides",
    "family": "Myadestes",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Myiothlypis coronata",
    "name": "Russet-crowned warbler",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/13/NBII_Image_Gallery_-Basileuterus_coronatus-a00207.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Myiothlypis_coronata",
    "family": "Myiothlypis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Myiothlypis fulvicauda",
    "name": "Buff-rumped warbler",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/32/Myiothlypis_fulvicauda_Ara%C3%B1ero_ribere%C3%B1o_Buff-rumped_Warbler_%286578326723%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Myiothlypis_fulvicauda",
    "family": "Myiothlypis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Myiothlypis nigrocristata",
    "name": "Black-crested warbler",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/82/Black-crested_Warbler_%28Basileuterus_nigrocristatus%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Myiothlypis_nigrocristata",
    "family": "Myiothlypis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Myiozetetes cayanensis",
    "name": "Rusty-margined flycatcher",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Rusty-margined_flycatcher_%28Myiozetetes_cayanensis_hellmayri%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Myiozetetes_cayanensis",
    "family": "Myiozetetes",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Nyctidromus albicollis",
    "name": "Pauraque",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/Common_pauraque_%28Nyctidromus_albicollis_yucatanensis%29_Orange_Walk.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Nyctidromus_albicollis",
    "family": "Nyctidromus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Ortalis columbiana",
    "name": "Colombian chachalaca",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/23/Ortalis_columbiana.JPG",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Ortalis_columbiana",
    "family": "Ortalis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Percnostola rufifrons",
    "name": "Black-headed antbird",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/95/Percnostola_rufifrons_Black-headed_Antbird_%28male%29%3B_Serra_do_Navio%2C_Amap%C3%A1%2C_Brazil_%28cropped%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Percnostola_rufifrons",
    "family": "Percnostola",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Pheugopedius mystacalis",
    "name": "Whiskered wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Pheugopedius_mystacalis_-_Whiskered_wren%3B_Rubio%2C_T%C3%A1chira%2C_Venezuela.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Pheugopedius_mystacalis",
    "family": "Pheugopedius",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Pitangus sulphuratus",
    "name": "Great kiskadee",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/94/Great_kiskadee_%2870240%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Pitangus_sulphuratus",
    "family": "Pitangus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Psarocolius angustifrons",
    "name": "Russet-backed oropendola",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Russet-backed_Oropendula_-_Colombia_S4E4256_%2823781027782%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Psarocolius_angustifrons",
    "family": "Psarocolius",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Rupornis magnirostris",
    "name": "Roadside hawk",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Buteo_magnirostris_-Goias_-Brazil-8.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Rupornis_magnirostris",
    "family": "Rupornis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Saltator striatipectus",
    "name": "Streaked saltator",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Saltator_striatipectus_-Manizales%2C_Caldas%2C_Colombia-8_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Saltator_striatipectus",
    "family": "Saltator",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Scytalopus griseicollis",
    "name": "Pale-bellied tapaculo",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/75/Scytalopus_griseicollis_morenoi_%2825529188474%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Scytalopus_griseicollis",
    "family": "Scytalopus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Scytalopus latrans",
    "name": "Blackish tapaculo",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/50/Scytalopus_latrans_-NBII_Image_Gallery-a00273.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Scytalopus_latrans",
    "family": "Scytalopus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Scytalopus spillmanni",
    "name": "Spillmann's tapaculo",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/61/Scytalopus_spillmanni_-_Christoph_Moning_-_164219442.jpeg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Scytalopus_spillmanni",
    "family": "Scytalopus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Sporophila nigricollis",
    "name": "Yellow-bellied seedeater",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Sporophila_nigricollis_%28male%29_-NW_Ecuador.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Sporophila_nigricollis",
    "family": "Sporophila",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Synallaxis albescens",
    "name": "Pale-breasted spinetail",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/89/Synallaxis_albescens_-Piraju%2C_Sao_Paulo%2C_Brazil-8.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Synallaxis_albescens",
    "family": "Synallaxis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Synallaxis azarae",
    "name": "Azara's spinetail",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Synallaxis_azarae_76608368.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Synallaxis_azarae",
    "family": "Synallaxis",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Thamnophilus multistriatus",
    "name": "Bar-crested antshrike",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Bar-crested_antshrike_%28Thamnophilus_multistriatus_multistriatus%29_male_Cundinamarca.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Thamnophilus_multistriatus",
    "family": "Thamnophilus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Troglodytes aedon",
    "name": "Northern house wren",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/House_wren_in_Prospect_Park_%2823218%29.jpg/3840px-House_wren_in_Prospect_Park_%2823218%29.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Troglodytes_aedon",
    "family": "Troglodytes",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Vanellus chilensis",
    "name": "Southern lapwing",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Southern_Lapwing_-_Indaiatuba%2C_SP%2C_BR.jpg/3840px-Southern_Lapwing_-_Indaiatuba%2C_SP%2C_BR.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Vanellus_chilensis",
    "family": "Vanellus",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Zimmerius chrysops",
    "name": "Golden-faced tyrannulet",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/43/Golden-faced_Tyrannulet_-_Colombia_S4E9917.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Zimmerius_chrysops",
    "family": "Zimmerius",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Zonotrichia capensis",
    "name": "Rufous-collared sparrow",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Rufous-collared_sparrow_%28Zonotrichia_capensis_costaricensis%29_2.jpg/3840px-Rufous-collared_sparrow_%28Zonotrichia_capensis_costaricensis%29_2.jpg",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Zonotrichia_capensis",
    "family": "Zonotrichia",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Psittacara wagleri",
    "name": "perico cabecirrojo",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Psittacara_wagleri",
    "family": "Psittacidae",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Tyrannus melancholicus",
    "name": "tirano tropical",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Tyrannus_melancholicus",
    "family": "Tyrannidae",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Turdus fuscater",
    "name": "mirla grande",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Turdus_fuscater",
    "family": "Turdidae",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Pyrrhomyias cinnamomeus",
    "name": "mosquerito canelo",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Pyrrhomyias_cinnamomeus",
    "family": "Tyrannidae",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Myioborus ornatus",
    "name": "candelita cabecidorada",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Myioborus_ornatus",
    "family": "Parulidae",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Myioborus miniatus",
    "name": "candelita pechirroja",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Myioborus_miniatus",
    "family": "Parulidae",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Grallaria nuchalis",
    "name": "tororoi nuciblanco",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Grallaria_nuchalis",
    "family": "Grallariidae",
    "conservationStatus": "LC"
  },
  {
    "scientificName": "Grallaria kaestneri",
    "name": "tororoi de Cundinamarca",
    "imageUrl": "",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Grallaria_kaestneri",
    "family": "Grallariidae",
    "conservationStatus": "EN"
  }
];