const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('d8')
        .setDescription('Faite un jet de dé 8'),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 8) + 1;
        let answer = ""
        let color = "#0099ff"
        if(result == 1){
            answer = "Vous avez fait un **1**, c'est un échec critique !"
            color = "#ff0000"
        }
        else if(result == 8) {
            answer = "Vous avez fait un **8**, c'est une réussite critique !"
            color = "#00ff00"
        }
        else answer = `Vous avez fait un **${result}**`


        const background = await loadImage('./8-sided-dice.png')
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
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), '8-sided-dice.png')

        const text = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(answer)
            .setDescription(`Jet de dé 8 de ${interaction.user.username}`)
            .setImage('attachment://8-sided-dice.png')
            .setTimestamp()

        await interaction.reply({ embeds: [text], files: [attachment] });

    }
}