const { analyzeHddListing } = require("../ai/hddAnalyzer");

async function detectOpportunity(product) {
  const MAX_EUR_PER_TB = 10; // Define el umbral máximo de euros por TB

  return new Promise((resolve, reject) => {
    const analysis = analyzeHddListing({
      title: product.title,
      description: product.description,
    }).then((analysis) => {
      console.log("1");

      // Solo nos interesan discos de almacenamiento, HDD y que NO sean SAS
      if (!analysis.is_storage_listing) resolve(null);
      console.log("2");

      if (!analysis.is_hdd) resolve(null);
      console.log("3");

      if (analysis.interface === "SAS") resolve(null);
      console.log("4");

      if (!analysis.capacity_tb || !analysis.units) resolve(null);

      console.log("todos los filtros pasados");

      const totalTb = analysis.capacity_tb * analysis.units;
      const eurPerTb = product.price / totalTb;

      console.log("eurPerTb:", eurPerTb);

      if (eurPerTb <= MAX_EUR_PER_TB) {
        resolve(product);
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = {
  detectOpportunity,
};
