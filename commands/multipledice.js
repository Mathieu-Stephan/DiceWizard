const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('multipledice')
        .setDescription('Lance plusieurs dés')
        .addStringOption(option =>
            option.setName('nombre-dés')
            .setDescription('Le nombre de dés à lancer')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('type-dés')
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
        
        numberOfDice = interaction.options.getString('nombre-dés');
        numberOfDice = parseInt(numberOfDice);
        diceType = interaction.options.getString('type-dés');


        //check if 'nombre-dés' is a number
        if(isNaN(numberOfDice)){
            await interaction.reply({ content: 'Le nombre de dés doit être un nombre !', ephemeral: true });
            return;
        }

        //check if the number of dice is valid
        if(numberOfDice < 1){
            await interaction.reply({ content: 'Vous devez lancer au moins un dé !', ephemeral: true });
            return;
        }

        if(numberOfDice > 100){
            await interaction.reply({ content: 'Vous ne pouvez pas lancer plus de 100 dés !', ephemeral: true });
            return;
        }

        // if 'type-dés' is d4
        if(diceType == 'd4'){
            for(i = 0; i < numberOfDice; i++){
                results.push(Math.floor(Math.random() * 4) + 1);
            }
        }

        // if 'type-dés' is d6
        if(diceType == 'd6'){
            for(i = 0; i < numberOfDice; i++){
                results.push(Math.floor(Math.random() * 6) + 1);
            }
        }

        // if 'type-dés' is d8
        if(diceType == 'd8'){
            for(i = 0; i < numberOfDice; i++){
                results.push(Math.floor(Math.random() * 8) + 1);
            }
        }


        // if 'type-dés' is d10
        if(diceType == 'd10'){
            for(i = 0; i < numberOfDice; i++){
                results.push(Math.floor(Math.random() * 10) + 1);
            }
        }

        // if 'type-dés' is d12
        if(diceType == 'd12'){
            for(i = 0; i < numberOfDice; i++){
                results.push(Math.floor(Math.random() * 12) + 1);
            }
        }

        // if 'type-dés' is d20
        if(diceType == 'd20'){
            for(i = 0; i < numberOfDice; i++){
                results.push(Math.floor(Math.random() * 20) + 1);
            }
        }

        resultats = results.join(', ');
        resultats = resultats.toString();
        total = results.reduce((a, b) => a + b, 0);
        total = total.toString();

        //create the embed
        const text = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setAuthor({ name: 'DiceWizard', iconURL: 'https://cdn.discordapp.com/app-icons/1100141622328557688/df91a59c63c429e963031a5af7d8a165.png?size=256' })
            .setTitle('Résultats')
            .setDescription('Voici les résultats de votre lancer de ' + numberOfDice+ " " + diceType)
            .addFields(
                { name: 'Résultats', value: resultats},
                { name: 'Total', value: total }
            )
            .setFooter({ text: 'DiceWizard V0.1.3' })
            .setTimestamp();

        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({ embeds: [text] });
    },
};
