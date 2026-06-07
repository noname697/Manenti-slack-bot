# Slack Bot

A Slack bot built with [Slack Bolt](https://slack.dev/bolt-js/) and [Axios](https://axios-http.com/), using slash commands to fetch content from external APIs.

## Features

- Sends a Hello World message
- Fetches a random cat image
- Shows Pokemon details with image
- Shows anime information with image
- Returns a stoic quote
- Returns a random joke
- Returns a random meme
- Displays current weather by city

## Command List (Slash Commands)

| Command | How to use | Example | Response |
| --- | --- | --- | --- |
| `/manenti-hw` | Send the command without parameters. | `/manenti-hw` | `Hello, World!` |
| `/manenti-help` | Lists available commands. | `/manenti-help` | Help menu |
| `/manenti-cat` | Send the command without parameters. | `/manenti-cat` | Random cat image |
| `/manenti-pokemon [name]` | Enter the Pokemon name in English. | `/manenti-pokemon pikachu` | Type, abilities, stats, and image |
| `/manenti-anime [name]` | Enter the anime name. | `/manenti-anime naruto` | Score, episodes, and image |
| `/manenti-quote` | Send the command without parameters. | `/manenti-quote` | Stoic quote |
| `/manenti-joke` | Send the command without parameters. | `/manenti-joke` | Random joke |
| `/manenti-meme` | Send the command without parameters. | `/manenti-meme` | Random meme with image |
| `/manenti-weather [city]` | Enter the city name. | `/manenti-weather Sao Paulo` | Condition, temperature, humidity, and wind |

## Required Permissions (Slack)

Configure your Slack app with the scopes and settings below:

### OAuth Scopes (Bot Token Scopes)

- `commands` (required for slash commands)

### Socket Mode

- Enable Socket Mode
- Generate an App-Level Token with `connections:write` scope

### Slash Commands

Register the following commands in your app:

- `/manenti-hw`
- `/manenti-help`
- `/manenti-cat`
- `/manenti-pokemon`
- `/manenti-anime`
- `/manenti-quote`
- `/manenti-joke`
- `/manenti-meme`
- `/manenti-weather`

## Self-Hosting

### Requirements

- Node.js 18+
- A Slack account/workspace
- A Slack app with Socket Mode enabled
- A WeatherAPI key

### 1. Clone and install

```bash
git clone https://github.com/your-username/slack-bot.git
cd slack-bot
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
WEATHER_API_KEY=your-weatherapi-key
```

### 3. Run locally

```bash
node index.js
```

If everything is correct, your terminal will show:

```text
bot is running!
```

### 4. Deploy to a server (optional)

Because the bot uses Socket Mode, it does not need a public URL to receive events.
On a VPS/Linux server, you can keep the process running with PM2:

```bash
npm i -g pm2
pm2 start index.js --name slack-bot
pm2 save
```

## Screenshots

Replace the images below with real screenshots from your Slack workspace:

![Help command](images/help.png)
![Pokemon command](images/pokemon.png)
![Weather command](images/weather.png)

## Project Structure

```text
index.js
package.json
README.md
```

## License

This project is licensed under the MIT License.
