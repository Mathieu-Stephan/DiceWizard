const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('documonstres')
        .setDescription('Affiche la documentation des monstres'),
    async execute(interaction) {
        const text = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: 'DiceWizard', iconURL: 'https://cdn.discordapp.com/app-icons/1100141622328557688/df91a59c63c429e963031a5af7d8a165.png?size=256' })
            .setTitle('Documentation des monstres')
            .setDescription('Voici la documentation des monstres')
            .addFields(
                { name: 'Documentation des monstres', value: 'https://www.aidedd.org/dnd-filters/monstres.php' }
            )
            .setTimestamp()

        await interaction.reply({ embeds: [text] });

    }
}