const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('d10')
        .setDescription('Faite un jet de dé 10')
        .addIntegerOption(option =>
            option.setName('bonus')
              .setDescription('Le bonus à ajouter au jet de dé')
              .setRequired(false)
          ),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 10) + 1;
        let answer = ""
        let color = "#0099ff"
        if(result == 1){
            answer = "Vous avez fait un **1**, c'est un échec critique !"
            color = "#ff0000"
        }
        else if(result == 10) {
            answer = "Vous avez fait un **10**, c'est une réussite critique !"
            color = "#00ff00"
        }
        else answer = `Vous avez fait un **${result}**`

        if (interaction.options.getInteger('bonus') > 100 || interaction.options.getInteger('bonus') == 0) {
            await interaction.reply({ content: 'Le bonus ne peut pas être supérieur à 100 ou être nul', ephemeral: true });
            return;
      
          }
      
          if (interaction.options.getInteger('bonus') < 0) {
              let modifieur = "-"   
          }
          else {
              let modifieur = "+"
          }
      

        let size = '400px'
        let location = 750
        if(result < 10) size = '500px', location = 850

        const background = await loadImage('./10-sided-dice.png')
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
        if (interaction.options.getInteger('bonus')) {
            ctx.font = '200px sans-serif'
            ctx.fillStyle = '#ffffff'
            ctx.fillText( modifieur +`${interaction.options.getInteger('bonus')}`, 100, 300)
        }
        ctx.clip()
        ctx.drawImage(avatar, 1700, 100, 200, 200)
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), '10-sided-dice.png')

        const text = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(answer)
            .setDescription(`Jet de dé 10 de ${interaction.user.username}`+ (interaction.options.getInteger('bonus') ? ` avec un bonus de ${interaction.options.getInteger('bonus')} pour un total de **${result + interaction.options.getInteger('bonus')}**` : ""))
            .setImage('attachment://10-sided-dice.png')
            .setTimestamp()

        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({ embeds: [text], files: [attachment] , ephemeral: false });

    }
}

