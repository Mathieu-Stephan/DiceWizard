const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

const param = [
    'name',
    'race',
    'class',
    'level',
    'skills',
    'stats',
    'spells'
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charmodif')
        .setDescription('Modifie la fiche de personnage [ADMIN]')
        .addUserOption(option => 
            option.setName('user').setDescription('L\'utilisateur à modifier').setRequired(true)
        )
        .addStringOption(option =>
            option.setName('Paramètre').setDescription('Le paramètre à modifier').addChoices(param).setRequired(true)
        )
        .addStringOption(option =>
            option.setName('Valeur').setDescription('La valeur à modifier').setRequired(true)
        ),
    async execute(interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')){
            await interaction.reply({ content: 'Vous n\'avez pas la permission d\'utiliser cette commande !', ephemeral: true });
            return;
        }
        //get data from charSheets.json
        const fs = require('fs');
        const charSheets = JSON.parse(fs.readFileSync('./charSheets.json', 'utf8'));
        //check if the user has a character sheet
        if (!(interaction.options.getUser('user').id in charSheets)) {
            await interaction.reply({ content: 'Cet utilisateur n\'a pas de fiche de personnage !', ephemeral: true });
            return;
        }
        //check if the parameter is valid
        if(!param.includes(interaction.options.getString('Paramètre'))){
            await interaction.reply({ content: 'Ce paramètre n\'existe pas !', ephemeral: true });
            return;
        }

        //checks for each parameter if the value is valid
        if(interaction.options.getString('Paramètre') == 'name'){
            if(interaction.options.getString('Valeur').length > 20){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(interaction.option.getString('Paramètre') == 'race'){
            if(interaction.options.getString('Valeur').length > 20){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(interaction.option.getString('Paramètre') == 'class'){
            if(interaction.options.getString('Valeur').length > 20){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(interaction.option.getString('Paramètre') == 'level'){
            valeurNum = parseInt(interaction.options.getString('Valeur'));
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

        if(interaction.option.getString('Paramètre') == 'skills'){
            if(interaction.options.getString('Valeur').length > 40){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(interaction.option.getString('Paramètre') == 'stats'){
            statNum = parseInt(interaction.options.getString('Valeur'));
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

        if(interaction.option.getString('Paramètre') == 'spells'){
            if(interaction.options.getString('Valeur').length > 40){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        //modifies the value (if param is skills or spells, add the value to the array)
        if(interaction.option.getString('Paramètre') == 'skills' || interaction.option.getString('Paramètre') == 'spells'){
            charSheets[interaction.options.getUser('user').id][interaction.options.getString('Paramètre')].push(interaction.options.getString('Valeur'));
        }else{
            charSheets[interaction.options.getUser('user').id][interaction.options.getString('Paramètre')] = interaction.options.getString('Valeur');
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