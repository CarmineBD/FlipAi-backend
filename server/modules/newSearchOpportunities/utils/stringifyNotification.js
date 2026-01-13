function stringifyNotification(opportunities) {
  let msj = `**Nuevas ${opportunities.length} posibles oportunidades encontradas :**\n \n`;

  for (let i = 0; i < opportunities.length; i++) {
    const title = encodeURIComponent(opportunities[i].title);
    const article_url = encodeURIComponent(opportunities[i].article_url);

    msj += `[${decodeURIComponent(title)}](${decodeURIComponent(
      article_url
    )}) ${opportunities[i].price}€ \n
    `;
  }

  return msj;
}

module.exports = {
  stringifyNotification,
};
