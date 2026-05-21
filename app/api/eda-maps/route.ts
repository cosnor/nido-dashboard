// app/api/eda-maps/route.ts
export async function GET() {
  const maps = [
    // {
    //   src: "/eda_elevacion.html",
    //   title: "Distribución por Elevación",
    //   fileName: "eda_elevacion.html",
    // },
    {
      src: "/eda_mapa_densidad.html", 
      title: "Mapa de Densidad",
      fileName: "eda_mapa_densidad.html",
    },
  ]
  return Response.json({ maps })
}