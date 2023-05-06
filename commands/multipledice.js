const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('multipledice')
        .setDescription('Lance plusieurs dés')
        .addStringOption(option =>
            option.setName('nombre de dés')
            .setDescription('Le nombre de dés à lancer')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('Type de dés')
            .setDescription('Le type de dés à lancer')
            .setRequired(true)
            .addChoices(
                {name: 'd4', value: 'd4'},
                {name: 'd6', value: 'd6'},
                {name: 'd8', value: 'd8'},
                {name: 'd10', value: 'd10'},
                {name: 'd12', value: 'd12'},
                {name: 'd20', value: 'd20'}
            )
        ),
    async execute(interaction) {
        results = [];
        //check if 'nombre de dés' is a number
        if(isNaN(interaction.options.getString('nombre de dés'))){
            await interaction.reply({ content: 'Le nombre de dés doit être un nombre !', ephemeral: true });
            return;
        }

        //check if the number of dice is valid
        if(interaction.options.getString('nombre de dés') < 1){
            await interaction.reply({ content: 'Vous ne pouvez pas lancer moins d\'un dé !', ephemeral: true });
            return;
        }

        if(interaction.options.getString('nombre de dés') > 100){
            await interaction.reply({ content: 'Vous ne pouvez pas lancer plus de 100 dés à la fois !', ephemeral: true });
            return;
        }

        // if 'Type de dés' is d4
        if(interaction.options.getString('Type de dés') == 'd4'){
            for(i = 0; i < interaction.options.getString('nombre de dés'); i++){
                results.push(Math.floor(Math.random() * 4) + 1);
            }
        }

        // if 'Type de dés' is d6
        if(interaction.options.getString('Type de dés') == 'd6'){
            for(i = 0; i < interaction.options.getString('nombre de dés'); i++){
                results.push(Math.floor(Math.random() * 6) + 1);
            }
        }

        // if 'Type de dés' is d8
        if(interaction.options.getString('Type de dés') == 'd8'){
            for(i = 0; i < interaction.options.getString('nombre de dés'); i++){
                results.push(Math.floor(Math.random() * 8) + 1);
            }
        }

        // if 'Type de dés' is d10
        if(interaction.options.getString('Type de dés') == 'd10'){
            for(i = 0; i < interaction.options.getString('nombre de dés'); i++){
                results.push(Math.floor(Math.random() * 10) + 1);
            }
        }

        // if 'Type de dés' is d12
        if(interaction.options.getString('Type de dés') == 'd12'){
            for(i = 0; i < interaction.options.getString('nombre de dés'); i++){
                results.push(Math.floor(Math.random() * 12) + 1);
            }
        }

        // if 'Type de dés' is d20
        if(interaction.options.getString('Type de dés') == 'd20'){
            for(i = 0; i < interaction.options.getString('nombre de dés'); i++){
                results.push(Math.floor(Math.random() * 20) + 1);
            }
        }

        else{
            await interaction.reply({ content: 'Une erreur est survenue !', ephemeral: true });
            return;
        }

        //create the embed
        const text = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setAuthor({ name: 'DiceWizard', iconURL: 'https://cdn.discordapp.com/app-icons/1100141622328557688/df91a59c63c429e963031a5af7d8a165.png?size=256' })
            .setTitle('Résultats')
            .setDescription('Voici les résultats de votre lancer de dés')
            .addFields(
                { name: 'Résultats', value: results.join(', ') },
                { name: 'Total', value: results.reduce((a, b) => a + b, 0) }
            )
            .setFooter({ text: 'DiceWizard V0.1.2' })
            .setTimestamp();

        await interaction.reply({ embeds: [text] });
    },
};
