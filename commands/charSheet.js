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
        //create the embed
        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setAuthor({ name: 'DiceWizard', iconURL: 'https://cdn.discordapp.com/app-icons/1100141622328557688/df91a59c63c429e963031a5af7d8a165.png?size=256' })
            .setTitle('Fiche de personnage')
            .setDescription('Voici votre fiche de personnage')
            .addFields(
                { name: 'Nom', value: charSheet.name },
                { name: 'Classe', value: charSheet.class },
                { name: 'Niveau', value: charSheet.level },
                { name: 'Sorts', value: charSheet.spells },
                { name: 'Compétences', value: charSheet.skills },
                { name: 'Caractéristiques', value: charSheet.stats }
            )
            .setFooter({ text: 'DiceWizard V0.1' })
            .setTimestamp()
        //send the embed
        await interaction.reply({ embeds: [embed] });

        

    }
}


