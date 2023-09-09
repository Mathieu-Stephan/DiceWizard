const express = require("express");
const app = express();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Discord, Events, GatewayIntentBits } = require('discord.js');

var http = require('http');
const { text } = require("stream/consumers");

http.createServer(function(req, res) {
  res.write("DnD time !");
  res.end();
}).listen(8080);

app.listen(3000, () => {
  console.log("Donjons et Dragon, la grande aventure !");
});

const codeHtml = fs.readFileSync("./index.html", "utf8");
const codeCss = fs.readFileSync("./style.css", "utf8");
const favicon = fs.readFileSync("./favicon.ico", "utf8");


app.get("/", (req, res) => {
  res.send(codeHtml);
  res.send(codeCss);
  res.send(favicon);
});



const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log('[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.');
  }
}


function handle(message) {
  if (message.author.bot) {
    return;
  }

  try {
    console.log(message.content);
    var txt = message.cleanContent;
    txt = txt.split(" ");
    console.log(txt);

    for (var i = txt.length - 1; i >= 0; i--) {
      txt[i] = txt[i];
      if (txt[i] == '') {
        txt.splice(i, 1);
      }
    }
    console.log(txt);

    //Stuff here

    //debug print all charSheets
    if (txt[0] == "!debug_allCharSheets") {
      const charSheets = JSON.parse(fs.readFileSync('./charSheets.json', 'utf8'));
      console.log(charSheets);
      message.channel.send("Check the console !");
    }

    
  } catch (TypeError) {
    console.error("TypeError");
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", message => {
  handle(message);
});


client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error('No command matching ${interaction.commandName} was found.');
    return;
  }

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(process.env.token);