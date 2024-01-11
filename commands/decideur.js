const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

const reponse = [
    "Oui bien sûr !",
    "Non, je ne pense pas.",
    "Oui",
    "Non",
    "Peut-être",
    "Je ne sais pas",
    "C'est la pire question que j'ai jamais entendu",
    "Je ne peux pas répondre à cette question",
    "Il faudrait être stupide pour poser cette question",
    "Je ne sais pas, mais je pense que oui",
    "Je ne sais pas, mais je pense que non",
    "Aucune idée, je suis qu'un bot"
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
