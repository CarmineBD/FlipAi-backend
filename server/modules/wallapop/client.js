async function fetchUrl(url) {
  const fetch = (await import("node-fetch")).default;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-DeviceOS": "0",
      },
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
    throw error;
  }
}

module.exports = {
  fetchUrl,
};
