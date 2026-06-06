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

(async () => {
  await app.start();
  console.log("bot is running!");
})();
