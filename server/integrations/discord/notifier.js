const { Client } = require("discord.js");

const client = new Client({
  intents: [3276799],
});

const channelId = process.env.DISCORD_CHANNEL_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

client.on("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

function notification(msg) {
  const canal = client.channels.cache.get(channelId);
  if (canal) {
    canal.send(msg);
  } else {
    console.error(
      "El canal no se encontro. Asegurate de que el ID del canal sea correcto."
    );
  }
}

client.login(botToken);

module.exports = {
  notification,
};
