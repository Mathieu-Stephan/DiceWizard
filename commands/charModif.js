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
                {name: 'spells', value: 'spells'},
                {name: 'hp', value: 'hp'}
            )
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('valeur')
            .setDescription('La valeur à modifier')
            .setRequired(true)
        ),
    async execute(interaction) {
        const member = interaction.member;
        if(!member.roles.cache.some(role => role.name === '👑-Maître du Jeu-👑')){
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
            // add the user to charSheets.json
            newUserId = interaction.options.getUser('user').id;

            charSheets[newUserId] = {
                "name":"",
                "race":"", 
                "hp":0 ,
                "class":"",
                "level":"0",
                "skills":[""],
                "stats":{"Force":0,"Dextérité":0,"Constitution":0,"Intelligence":0,"Sagesse":0,"Charisme":0},
                "spells":[""]
            }
            await interaction.reply({ content: 'L\'utilisateur n\'avait pas de fiche de personnage, il a donc été ajouté !', ephemeral: true });
            return;
        }

        //checks for each parameter if the value is valid
        if(param == 'name'){
            if(interaction.options.getString('valeur').length > 40){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(param == 'race'){
            if(interaction.options.getString('valeur').length > 40){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(param == 'class'){
            if(interaction.options.getString('valeur').length > 40){
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
            if(valeurNum < 1 || valeurNum > 40){
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
            //value must be in the form of {"Force":Value0,"Dextérité":Value1,"Constitution":Value2,"Intelligence":Value3,"Sagesse":Value4,"Charisme":Value5}
            if(!interaction.options.getString('valeur').startsWith('{') || !interaction.options.getString('valeur').endsWith('}')){
                await interaction.reply({ content: 'La valeur doit être au format {"Force":Value0,"Dextérité":Value1,"Constitution":Value2,"Intelligence":Value3,"Sagesse":Value4,"Charisme":Value5} !', ephemeral: true });
                return;
            }
            //value must be between 1 and 30
            if(statNum < 1 || statNum > 30){
                await interaction.reply({ content: 'La valeur doit être comprise entre 1 et < 30 !', ephemeral: true });
                return;
            }
        }

        if(param == 'spells'){
            if(interaction.options.getString('valeur').length > 40){
                await interaction.reply({ content: 'Le nom est trop long !', ephemeral: true });
                return;
            }
        }

        if(param == 'hp'){
            valeurNum = parseInt(interaction.options.getString('valeur'));
            //value must be a number
            if(isNaN(valeurNum)){
                await interaction.reply({ content: 'La valeur doit être un nombre !', ephemeral: true });
                return;
            }
        }


        //modifies the value (if param is skills or spells, add the value to the array)
        if(param == 'skills' || param == 'spells'){
            charSheets[interaction.options.getUser('user').id][interaction.options.getString('paramètre')].push(interaction.options.getString('valeur'));
        }
        else if(param == 'stats'){
            charSheets[interaction.options.getUser('user').id][interaction.options.getString('paramètre')] = JSON.parse(interaction.options.getString('valeur'));
        }
        else{
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