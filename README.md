# Slack Bot

A Slack bot built with [Slack Bolt](https://slack.dev/bolt-js/) and [Axios](https://axios-http.com/) that responds to slash commands with fun content from external APIs.

## Features

- Sends a hello message
- Fetches random cat images
- Shows Pokémon details with images
- Shows anime information with images
- Returns stoic quotes
- Returns random jokes
- Returns random memes
- Displays current weather for a city

## Commands

- `/manenti-hw` - Returns `Hello, World!`
- `/manenti-help` - Shows the available commands
- `/manenti-cat` - Sends a random cat image
- `/manenti-pokemon [pokemon name]` - Fetches Pokémon data
- `/manenti-anime [anime name]` - Fetches anime data
- `/manenti-quote` - Returns a stoic quote
- `/manenti-joke` - Returns a random joke
- `/manenti-meme` - Returns a random meme
- `/manenti-weather [city name]` - Returns the current weather for a city

## Requirements

- Node.js
- A Slack app with Socket Mode enabled
- API keys and tokens for the services you want to use

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
WEATHER_API_KEY=your-weatherapi-key
```

## Installation

```bash
npm install
```

## Run

```bash
node index.js
```

## Notes

- The bot uses Socket Mode, so it does not need a public webhook URL.
- Some commands rely on third-party APIs, so availability depends on those services.
- Make sure your Slack app has the proper slash command permissions configured.

## Project Structure

```text
index.js
package.json
README.md
```

## License

This project is licensed under the MIT License.
