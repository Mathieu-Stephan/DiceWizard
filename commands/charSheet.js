const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charsheet')
        .setDescription('Affiche la fiche de personnage'),
    async execute(interaction) {
        //get data from charSheets.json
        const fs = require('fs');
        const charSheets = JSON.parse(fs.readFileSync('./charSheets.json', 'utf8'));
        //get the character sheet of the user inside data
        const charSheet = charSheets[interaction.user.id];
        //get the name of the character
        const charName = charSheet.name;
        //create the embed
        interaction.reply({ charName});

    }
}


