const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('d20')
        .setDescription('Faite un jet de dé 20'),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 20) + 1;
        let answer = ""
        let color = "#0099ff"
        if(result == 1){ 
            answer = "Vous avez fait un 1, c'est un échec critique !"
            color = "#ff0000"

        }
        else if(result == 20) {
            answer = "Vous avez fait un 20, c'est une réussite critique !"
            color = "#00ff00"
        }
        else answer = `Vous avez fait un ${result}`
        
        const background = await loadImage('./20-sided-dice.png')
        const canvas = createCanvas(2000, 2000)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        ctx.font = '100px sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(result, 800, 1000)
        const body = await interaction.user.displayAvatarURL({ extension: 'jpg' })
        const avatar = await loadImage(body)
        ctx.drawImage(avatar, 800, 1100, 400, 400)
        //add text : answer
        ctx.font = '50px sans-serif'
        ctx.fillStyle = color
        ctx.fillText(answer, 800, 1600)
        //add text : username
        ctx.font = '50px sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(interaction.user.username, 800, 1700)
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), '20-sided-dice.png')
        await interaction.reply({ files: [attachment] })

        



    }
}
