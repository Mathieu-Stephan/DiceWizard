const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('charmodif')
        .setDescription('Modifie la fiche de personnage [ADMIN]')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('L\'utilisateur à modifier')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('paramètre')
            .setDescription('Le paramètre à modifier')
            .addChoices(
                {name: 'name', value: 'name'},
                {name: 'race', value:'race'},
                {name: 'class', value: 'class'},
                {name: 'level', value: 'level'},
                {name: 'skills', value: 'skills'},
                {name: 'stats', value: 'stats'},
                {name: 'spells', value: 'spells'}
            )
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('valeur')
            .setDescription('La valeur à modifier')
            .setRequired(true)
        ),
    async execute(interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')){
            await interaction.reply({ content: 'Vous n\'avez pas la permission d\'utiliser cette commande !', ephemeral: true });
            return;
        }
        param = interaction.options.getString('paramètre');
        console.log(param);

        //get data from charSheets.json
        const fs = require('fs');
        const charSheets = JSON.parse(fs.readFileSync('./charSheets.json', 'utf8'));
        //check if the user has a character sheet
        if (!(interaction.options.getUser('user').id in charSheets)) {
            await interaction.reply({ content: 'Cet utilisateur n\'a pas de fiche de personnage !', ephemeral: true });
            return;
        }

        //checks for each parameter if the value is valid
        if(param == 'name'){
            if(interaction.options.getString('valeur').length > 20){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(param == 'race'){
            if(interaction.options.getString('valeur').length > 20){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(param == 'class'){
            if(interaction.options.getString('valeur').length > 20){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(param == 'level'){
            valeurNum = parseInt(interaction.options.getString('valeur'));
            //value must be a number
            if(isNaN(valeurNum)){
                await interaction.reply({ content: 'La valeur doit être un nombre !', ephemeral: true });
                return;
            }
            //value must be between 1 and 20
            if(valeurNum < 1 || valeurNum > 20){
                await interaction.reply({ content: 'La valeur doit être comprise entre 1 et 20 !', ephemeral: true });
                return;
            }
        }

        if(param == 'skills'){
            if(interaction.options.getString('valeur').length > 40){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(param == 'stats'){
            statNum = parseInt(interaction.options.getString('valeur'));
            //value must be a number
            if(isNaN(statNum)){
                await interaction.reply({ content: 'La valeur doit être un nombre !', ephemeral: true });
                return;
            }
            //value must be between 1 and 30
            if(statNum < 1 || statNum > 30){
                await interaction.reply({ content: 'La valeur doit être comprise entre 1 et 20 !', ephemeral: true });
                return;
            }
        }

        if(param == 'spells'){
            if(interaction.options.getString('valeur').length > 40){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        //modifies the value (if param is skills or spells, add the value to the array)
        if(param == 'skills' || param == 'spells'){
            charSheets[interaction.options.getUser('user').id][interaction.options.getString('paramètre')].push(interaction.options.getString('valeur'));
        }else{
            charSheets[interaction.options.getUser('user').id][interaction.options.getString('paramètre')] = interaction.options.getString('valeur');
        }

        //writes the new data in charSheets.json
        fs.writeFile('./charSheets.json', JSON.stringify(charSheets), (err) => {
            if (err) console.log(err);
        }
        );

        //sends a confirmation message
        await interaction.reply({ content: 'La fiche de personnage a bien été modifiée !', ephemeral: true });
    }
}