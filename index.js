const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/manenti-hw", async ({ ack, respond }) => {
  await ack();
  await respond({ text: "Hello, World!" });
});

app.command("/manenti-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/manenti-hw - Display "Hello, World!"
/manenti-help - Show available commands
/manenti-cat - Get a random cat image
/manenti-pokemon [pokemon name] - Get information about a specific Pokémon
/manenti-anime [anime name] - Get information about a specific anime
/manenti-quote - Get a random stoic quote
/manenti-joke - Get a random joke
/manenti-meme - Get a random meme
/manenti-weather [city name] - Get current weather information for a city
`,
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

app.command("/manenti-anime", async ({ command, ack, respond }) => {
  await ack();
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${command.text}`,
    );
    const animeName = response.data.data[0].title;
    const animeScore = response.data.data[0].score;
    const qntEpisodes = response.data.data[0].episodes;
    const imageUrl = response.data.data[0].images.jpg.image_url;

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Anime name: ${animeName}*
            *Score*: ${animeScore}
            *Episodes*: ${qntEpisodes} episodes
            `,
          },
        },
        {
          type: "image",
          image_url: imageUrl,
          alt_text: `Image of ${animeName}`,
        },
      ],
    });
  } catch (error) {
    await respond({
      text: `Sorry, I couldn't fetch an anime at the moment.\n error: ${error.message}`,
    });
  }
});

app.command("/manenti-quote", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get(`https://stoic.tekloon.net/stoic-quote`);
    const quote = response.data.data.quote;

    await respond({
      text: `Stoic quote of the day:\n>${quote}`,
    });
  } catch (error) {
    await respond({
      text: `Sorry, I couldn't fetch a quote at the moment.\n error: ${error.message}`,
    });
  }
});

app.command("/manenti-joke", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/Any?type=single`,
    );

    const joke = JSON.stringify(response.data.joke);

    await respond({
      text: `Here's a joke for you:\n>${joke}`,
    });
  } catch (error) {
    await respond({
      text: `Sorry, I couldn't fetch a joke at the moment.\n error: ${error.message}`,
    });
  }
});

app.command("/manenti-meme", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get(`https://api.imgflip.com/get_memes`);

    const memes = response.data.data.memes;
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${randomMeme.name}*`,
          },
        },
        {
          type: "image",
          image_url: randomMeme.url,
          alt_text: randomMeme.name,
        },
      ],
    });
  } catch (error) {
    await respond({
      text: `Sorry, I couldn't fetch a meme at the moment.\n error: ${error.message}`,
    });
  }
});

app.command("/manenti-weather", async ({ command, ack, respond }) => {
  await ack();

  const city = command.text.trim();

  if (!city) {
    await respond({
      text: "Please provide a city name. Usage: /manenti-weather [city name]",
    });
    return;
  }
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          aqi: "no",
          lang: "en",
        },
      },
    );
    const location = response.data.location;
    const current = response.data.current;

    const weatherIcon = current.condition.icon.startsWith("//")
      ? `https:${current.condition.icon}`
      : current.condition.icon;

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Weather in ${location.name}, ${location.region || location.country}*\n${current.condition.text}_`,
          },
          accessory: {
            type: "image",
            image_url: weatherIcon,
            alt_text: current.condition.text,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Temperature:*\n${current.temp_c}°C`,
            },
            {
              type: "mrkdwn",
              text: `*Feels like:*\n${current.feelslike_c}°C`,
            },
            {
              type: "mrkdwn",
              text: `*Humidity:*\n${current.humidity}%`,
            },
            {
              type: "mrkdwn",
              text: `*Wind:*\n${current.wind_kph} km/h`,
            },
            {
              type: "mrkdwn",
              text: `*Rain:*\n${current.precip_mm} mm`,
            },
            {
              type: "mrkdwn",
              text: `*Updated:*\n${current.last_updated}`,
            },
          ],
        },
      ],
    });
  } catch (error) {
    await respond({
      text: `Sorry, I couldn't fetch the weather information at the moment.\n error: ${error.message}`,
    });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
