const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { createCanvas, loadImage, encode } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('d6')
        .setDescription('Faite un jet de dé 6')
        .addIntegerOption(option =>
            option.setName('bonus')
              .setDescription('Le bonus à ajouter au jet de dé')
              .setRequired(false)
          ),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 6) + 1;
        let answer = "Vous avez fait un **" + result + "**"
        let color = "#0099ff"

        let bonus = interaction.options.getInteger('bonus')

        if(bonus == null) bonus = 0
        
        const background = await loadImage('./6-sided-dice.png')
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
        if (interaction.options.getInteger('bonus')) {
            ctx.font = '100px sans-serif'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Avec : ${bonus}`, 100, 300)
          }
        ctx.clip()
        ctx.drawImage(avatar, 1700, 100, 200, 200)
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), '6-sided-dice.png')

        const text = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(answer)
            .setDescription(`Jet de dé 6 de ${interaction.user.username}`+ `\n` + `Bonus : ${bonus} pour un total de **${result + bonus}**`)
            .setImage('attachment://6-sided-dice.png')
            .setTimestamp()

        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({ embeds: [text], files: [attachment], ephemeral: false  });

    }
}