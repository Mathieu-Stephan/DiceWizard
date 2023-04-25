const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('d4')
        .setDescription('Faite un jet de dé 4'),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 4) + 1;
        let answer = "Vous avez fait un **" + result + "**"
        let color = "#0099ff"

        const background = await loadImage('./4-sided-dice.png')
        const canvas = createCanvas(2000, 2000)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        //add text : result in the middle
        ctx.font = '400px sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(result, 825, 1200)
        const body = await interaction.user.displayAvatarURL({ extension: 'jpg' })
        const avatar = await loadImage(body)
        //add rounded avatar at the top right
        ctx.beginPath()
        ctx.arc(1800, 200, 100, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, 1700, 100, 200, 200)
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), '4-sided-dice.png')

        const text = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(answer)
            .setDescription(`Jet de dé 4 de ${interaction.user.username}`)
            .setImage('attachment://4-sided-dice.png')
            .setTimestamp()

        await interaction.reply({ embeds: [text], files: [attachment] });

    }
}