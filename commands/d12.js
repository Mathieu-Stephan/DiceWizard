const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('d12')
        .setDescription('Faite un jet de dé 12')
        .addIntegerOption(option =>
            option.setName('bonus')
              .setDescription('Le bonus à ajouter au jet de dé')
              .setRequired(false)
          ),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 12) + 1;
        let answer = ""
        let color = "#0099ff"
        if(result == 1){
            answer = "Vous avez fait un **1**, c'est un échec critique !"
            color = "#ff0000"
        }
        else if(result == 12) {
            answer = "Vous avez fait un **12**, c'est une réussite critique !"
            color = "#00ff00"
        }
        else answer = `Vous avez fait un **${result}**`

        let bonus = interaction.options.getInteger('bonus')
        if(bonus == null) bonus = 0
      

        let size = '400px'
        let location = 720
        if(result < 10) size = '500px', location = 840

        const background = await loadImage('./12-sided-dice.png')
        const canvas = createCanvas(2000, 2000)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        //add text : result in the middle
        ctx.font = size + ' sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(result, location, 1150)
        const body = await interaction.user.displayAvatarURL({ extension: 'jpg' })
        const avatar = await loadImage(body)
        //add rounded avatar at the top right
        ctx.beginPath()
        ctx.arc(1800, 200, 100, 0, Math.PI * 2, true)
        ctx.closePath()
        if (interaction.options.getInteger('bonus')) {
            ctx.font = '100px sans-serif'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Avec : ${bonus}`, 100, 300)
          }
        ctx.clip()
        ctx.drawImage(avatar, 1700, 100, 200, 200)
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), '12-sided-dice.png')

        const text = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(answer)
            .setDescription(`Jet de dé 12 de ${interaction.user.username}`+ `\n` + `Bonus : ${bonus} pour un total de **${result + bonus}**`)
            .setImage('attachment://12-sided-dice.png')
            .setTimestamp()

        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({ embeds: [text], files: [attachment] , ephemeral: false });

    }
}
