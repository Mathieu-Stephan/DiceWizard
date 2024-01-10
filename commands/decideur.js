const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

const reponse = [
    "Oui bien sûr !",
    "Non, je ne pense pas.",
    "Tu peux toujours essayer...",
    "C'est une bonne idée !",
    "Je ne suis pas sûr...",
    "Je ne sais pas...",
    "C'est la pire idée que j'ai jamais entendu !",
    "Je ne peux pas te répondre.... Je boude !",
    "Je ne sais pas quoi te dire...",
    "Un sort pourra peut-être t'aider a répondre à cette question...",
    "Je ne suis pas sûr que ce soit une bonne idée..."
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decideur')
        .setDescription('Posez une question au bot !')
        .addStringOption(option =>
            option.setName('question')
              .setDescription('La question à poser')
              .setRequired(true)
          ),
    async execute(interaction) {
        let result = Math.floor(Math.random() * reponse.length);
        let answer = "A la question : **" + interaction.options.getString('question') + "**\n" + "Le bot répond : **" + reponse[result] + "**"
        let color = "#0099ff"

        const text = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(answer)
            .setDescription(`Question de ${interaction.user.username}`)
            .setTimestamp()

        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({ embeds: [text], ephemeral: false });

    }
}
