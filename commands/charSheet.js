const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('charsheet')
    .setDescription('Affiche la fiche de personnage'),
  async execute(interaction) {
    //get data from charSheets.json
    const fs = require('fs');
    const charSheets = JSON.parse(fs.readFileSync('./charSheets.json', 'utf8'));
    //check if the user has a character sheet
    if (!(interaction.user.id in charSheets)) {
      await interaction.reply({ content: 'Vous n\'avez pas de fiche de personnage !', ephemeral: true });
      return;
    }

    function modifier(lv) {
      let mod = Math.floor((lv - 10) / 2);
      if (mod >= 0) {
        mod = '+' + mod.toString();
      }
      return mod;
    }

    //get the character sheet of the user inside data
    const charSheet = charSheets[interaction.user.id];
    //create the embed
    let nom = charSheet.name;
    let classe = charSheet.class;
    let race = charSheet.race;
    let niveau = charSheet.level;
    let niveauText = niveau.toString();
    let sorts = charSheet.spells;
    let sortsReady = sorts.toString();
    let competences = charSheet.skills;
    let competencesReady = competences.toString();
    let stats = charSheet.stats;
    let hp = charSheet.hp;
    hp = hp.toString();
    //make stats have there name
    let statsReady = [];
    for (stat in stats) {
      statsReady.push(stat + ": " + stats[stat] + " (" + modifier(stats[stat]) + ")");
    }


    competencesReady = competencesReady.replace(/,/g, ', ');
    sortsReady = sortsReady.replace(/,/g, ', ');
    statsReady = statsReady.toString();
    statsReady = statsReady.replace(/,/g, '\n');

    let icon = interaction.user.avatarURL();


    const embed = new Discord.EmbedBuilder()
      .setColor('#0099ff')
      .setAuthor({ name: 'DiceWizard', iconURL: 'https://cdn.discordapp.com/app-icons/1100141622328557688/df91a59c63c429e963031a5af7d8a165.png?size=256' })
      .setTitle('Fiche de personnage de ' + interaction.user.username)
      .setThumbnail(icon)
      .setDescription('Voici votre fiche de personnage')
      .addFields(
        { name: 'Nom', value: nom + ", NV " + niveauText, inline: true },
        { name: 'Race', value: race + ", " + hp + " HP", inline: true },
        { name: 'Classe', value: classe, inline: true },
        { name: 'Stats', value: statsReady, inline: false },
        { name: 'Sorts', value: sortsReady, inline: true },
        { name: 'Compétences', value: competencesReady, inline: true }
      )
      .setFooter({ text: 'DiceWizard V0.1.2' })
      .setTimestamp()
    //send the embed
    await interaction.reply({ embeds: [embed] });



  }
}


