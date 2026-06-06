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

(async () => {
  await app.start();
  console.log("bot is running!");
})();
