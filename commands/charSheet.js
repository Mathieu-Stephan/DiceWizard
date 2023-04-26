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
        //check if the user has a character sheet
        if (!(interaction.user.id in charSheets)) {
            await interaction.reply({ content: 'Vous n\'avez pas de fiche de personnage !', ephemeral: true });
            return;
        }

        //get the character sheet of the user inside data
        const charSheet = charSheets[interaction.user.id];
        //create the embed
        let nom = charSheet.name;
        let classe = charSheet.class;
        let niveau = charSheet.level;
        let niveauText = niveau.toString();
        let sorts = charSheet.spells;
        let sortsReady = sorts.toString();
        let competences = charSheet.skills;
        let competencesReady = competences.toString();
        competencesReady = competencesReady.replace(/,/g, ', ');
        sortsReady = sortsReady.replace(/,/g, ', ');

        let icon = interaction.user.avatarURL();


        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setAuthor({ name: 'DiceWizard', iconURL: 'https://cdn.discordapp.com/app-icons/1100141622328557688/df91a59c63c429e963031a5af7d8a165.png?size=256' })
            .setTitle('Fiche de personnage de ' + interaction.user.username)
            .setThumbnail(icon)
            .setDescription('Voici votre fiche de personnage')
            .addFields(
                { name: 'Nom', value: nom },
                { name: 'Classe', value: classe },
                { name: 'Niveau', value: niveauText },
                { name: 'Sorts', value: sortsReady },
                { name: 'Compétences', value: competencesReady }
            )
            .setFooter({ text: 'DiceWizard V0.1' })
            .setTimestamp()
        //send the embed
        await interaction.reply({ embeds: [embed] });

        

    }
}


