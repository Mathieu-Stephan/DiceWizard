const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('d100')
        .setDescription('Faite un jet de dé 100'),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 100) + 1;
        let answer = ""
        let color = "#0099ff"
        if(result == 1){ 
            answer = "Vous avez fait un **1**, c'est un échec super critique !"
            color = "#ff0000"

        }
        else if(result == 100) {
            answer = "Vous avez fait un **100**, c'est une réussite super critique !"
            color = "#00ff00"
        }
        else answer = `Vous avez fait un **${result}**`

        let size = '400px'
        let location = 750
        if(result < 10) size = '500px', location = 850
        else if(result < 100) size = '400px', location = 720

        
        const background = await loadImage('./100-sided-dice.png')
        const canvas = createCanvas(2000, 2000)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        //add text : result in the middle
        ctx.font = size + ' sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(result, location, 1200)
        const body = await interaction.user.displayAvatarURL({ extension: 'jpg' })
        const avatar = await loadImage(body)
        //add rounded avatar at the top right
        ctx.beginPath()
        ctx.arc(1800, 200, 100, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, 1700, 100, 200, 200)
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), '100-sided-dice.png')

        const text = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(answer)
            .setDescription(`Jet de dé 100 de ${interaction.user.username}`)
            .setImage('attachment://100-sided-dice.png')
            .setTimestamp()

        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({ embeds: [text], files: [attachment], ephemeral: false });

        



    }
}
