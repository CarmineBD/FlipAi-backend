function stringifyNotificationNewSearch(opportunities) {
  const total = opportunities?.length || 0;
  let msj = `**Nuevas ${total} posibles oportunidades encontradas :**\n\n`;

  for (const opportunity of opportunities || []) {
    const item = opportunity?.item || {};
    const title = item.title || "Sin titulo";
    const articleUrl = item.article_url || "";
    const price =
      item.price != null && Number.isFinite(Number(item.price))
        ? `${Number(item.price)}€`
        : "Precio N/D";

    msj += articleUrl
      ? `[${title}](${articleUrl}) ${price}\n`
      : `${title} ${price}\n`;
  }

  return msj;
}

module.exports = {
  stringifyNotificationNewSearch,
};
