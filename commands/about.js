const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Affiche les informations sur le bot'),
    async execute(interaction) {
        const text = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setAuthor({ name: 'DiceWizard', iconURL: 'https://cdn.discordapp.com/app-icons/1100141622328557688/df91a59c63c429e963031a5af7d8a165.png?size=256' })
            .setTitle('A propos de DiceWizard')
            .setDescription('DiceWizard est un bot Discord qui permet de faire des jets de dés. Il est développé par Poulpi#4747')
            .setFooter({ text: 'DiceWizard V0.1' })


        await interaction.reply({ embeds: [text] });

    }
}