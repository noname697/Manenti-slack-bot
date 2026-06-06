const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/manenti-hw", async ({ command, ack, respond }) => {
  await ack();
  await respond({ text: "Hello, World!" });
});

//TODO: Add mais no final do projeto
app.command("/manenti-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/manenti-hw - Display "Hello, World!"
/manenti-help - Show available commands`,
  });
});

app.command("/manenti-cat", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
    );
    const imageUrl = response.data[0].url;

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Here's a cat!*",
          },
        },
        {
          type: "image",
          image_url: imageUrl,
          alt_text: "Image of a cat",
        },
      ],
    });
  } catch (error) {
    await respond({
      text: `Sorry, I couldn't fetch a cat image at the moment.\n error: ${error.message}`,
    });
  }
});

app.command("/manenti-pokemon", async ({ command, ack, respond }) => {
  await ack();
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${command.text}`,
    );
    const imageUrl = response.data.sprites.front_default;
    const pokemonName = response.data.name;
    const type = response.data.types[0].type.name;
    const abilities = response.data.abilities
      .map((ability) => ability.ability.name)
      .join(", ");
    const stats = response.data.stats
      .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
      .join("\n");

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `**Here's a ${pokemonName}!**
            *Type*: ${type}
            *Abilities*: ${abilities}
            *Stats*: \n${stats}
            `,
          },
        },
        {
          type: "image",
          image_url: imageUrl,
          alt_text: `Image of ${pokemonName}`,
        },
      ],
    });
  } catch (error) {
    await respond({
      text: `Sorry, I couldn't fetch a pokemon at the moment.\n error: ${error.message}`,
    });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
