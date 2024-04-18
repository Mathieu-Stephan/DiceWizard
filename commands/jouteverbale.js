const { SlashCommandBuilder } = require("discord.js")

const jouteVerbale = [
    " que ton sort soit aussi funeste que ta présence, malotru!",,
    " ton esprit est aussi tortueux qu'un labyrinthe de gobelins!",,
    " ta lâcheté égale celle d'un nécromant fuyant ses propres créatures!",,
    " ta foi en toi-même est aussi fragile qu'un grimoire oublié dans une bibliothèque en ruine!",,
    " ton apparence est aussi repoussante qu'un troll des marais!",,
    " que ton courage soit aussi vif que la queue d'un lézard!",,
    " ta maladresse est aussi flagrante qu'un nain dansant sur une corde raide!",,
    " ton charisme est aussi éclatant qu'une boule de feu manquée!",,
    " ton intelligence est aussi limitée qu'un ogre comptant jusqu'à trois!",,
    " que ta volonté soit aussi faible que celle d'un spectre face à la lumière!",,
    " ta bêtise rivalise avec celle d'un troll tentant de jouer aux échecs!",
    " que ta voix soit aussi désagréable qu'un corbeau lors d'une aube funeste!",
    " ta présence est aussi malvenue qu'un dragon affamé dans un royaume pacifique!",
    " ton ambition est aussi vaine que celle d'un gobelin tentant de devenir roi!",
    " que ton honneur soit aussi flétri que celui d'un chevalier déchu!",
    " ta fourberie égale celle d'un sorcier invoquant des démons pour de menus services!",
    " que ta détermination soit aussi faible que celle d'un zombie se noyant dans un marécage!",
    " ta loyauté est aussi fluctuante que le vol d'un chauve-souris dans une tempête!",
    " que ton adresse soit aussi maladroite qu'un elfe dans une forge naine!",
    " ton égo est aussi démesuré qu'un géant se contemplant dans un lac!",
    " ta générosité est aussi rare que la clémence d'un liche!",
    " que ton jugement soit aussi altéré que celui d'un gobelin festoyant dans une taverne!",
    " ton arrogance égale celle d'un noble méprisant les roturiers!",
    " que ton sang soit aussi froid que celui d'un vampire cherchant sa proie!",
    " ta présomption est aussi grande que celle d'un mage dépassant ses limites!",
    " que ton aura soit aussi sombre que celle d'un sorcier corrompu!",
    " ton audace est aussi stupide que celle d'un gnome défiant un géant!",
    " que ta mémoire soit aussi courte que celle d'un orque après un coup sur la tête!",
    " ta félonie égale celle d'un traître vendant son propre royaume!",
    " que ta ruse soit aussi trompeuse que celle d'un renard au milieu d'une basse-cour!",
    " ton ambition est aussi creuse que celle d'un squelette aspirant à la vie éternelle!",
    " que ton esprit soit aussi émoussé que le tranchant d'une épée ébréchée!",
    " ta bravoure est aussi éphémère que celle d'un homme face à la mort!",
    " que ton espoir soit aussi vain que celui d'un paladin chutant dans un piège!",
    " ton audace est aussi imprudente que celle d'un fou dans un cachot de dragons!",
    " que ta stratégie soit aussi stupide que celle d'un gobelin chargeant seul contre un bataillon!",
    " ton éloquence égale celle d'un nain parlant avec un accent elfique!",
    " que ta sagesse soit aussi étriquée que celle d'un jeune écuyer rêvant de devenir roi!",
    " ta trahison est aussi perfide que celle d'un serpent rampant dans l'herbe!",
    " que ton cœur soit aussi froid que celui d'un géant des glaces!",
    " ton ambition égale celle d'un barde tentant de charmer une méduse!",
    " que ta présence soit aussi insupportable qu'un griffon dans un poulailler!",
    " ton arrogance est aussi écrasante que celle d'un géant en colère!",
    " que ton esprit soit aussi confus que le langage des gobelins!",
    " ta vanité égale celle d'un paon exhibant ses plumes devant un miroir!",
    " que ta chance soit aussi maudite que celle d'un aventurier croisant un dragon!",
    " ton humilité est aussi rare que celle d'un dragon dormant sur un trésor!",
    " que ta colère soit aussi destructrice que celle d'un élémentaire de feu enragé!",
    " ta paresse égale celle d'un troll sous un pont!",
    " que ta présomption soit aussi grande que celle d'un géant tentant de traverser un pont en bois!",
    " ton innocence est aussi fragile que celle d'un elfe dans un repaire de gobelins!",
    " que ton intelligence soit aussi limitée que celle d'un minotaure dans un labyrinthe!",
    " ta fierté égale celle d'un chevalier défiant un dragon!",
    " que ton honneur soit aussi taché que celui d'un paladin trahissant son serment!",
    " ta maladresse est aussi flagrante qu'un ogre dans une porcelaineerie!",
    " que ton courage soit aussi faible que celui d'un chat face à un basilic!",
    " ton arrogance égale celle d'un roi déchu!",
    " que ton esprit soit aussi trouble que les eaux d'un marais hanté!",
    " ta loyauté est aussi fluctuante que celle d'un mercenaire cherchant le plus offrant!",
    " que ta voix soit aussi désagréable que celle d'une banshee!",
    " ton charisme est aussi éclatant qu'une chauve-souris au soleil!",
    " que ton sang soit aussi froid que celui d'un spectre hantant un cimetière!",
    " ta volonté égale celle d'un esprit invoqué par un sorcier!",
    " que ton esprit soit aussi vif que celui d'un gobelin écrasé sous un rocher!",
    " ta générosité est aussi mince que les pièces d'or d'un mendiant!",
    " que ton courage soit aussi défaillant que celui d'un soldat face à un dragon!",
    " ton intelligence égale celle d'un gobelin dans une taverne!",
    " que ta présence soit aussi déplaisante qu'une hydre lors d'un banquet!",
    " on va maintenant de te laisser dans la fange, là où est ta place.",
    "! En garde, infâme déchet !",
    ", tu n’es pas déchu car tu es laid mon brave, mais parce que tu ne pourras jamais te relever.",
    ", les charognes attirent les charognards, je serai heureux de débarrasser la région de ta puanteur.",
    ", pas si près, ton haleine viciée m’indispose.",
    ", si ton courage égale ton incompétence, tu fais partie des plus braves.",
    " on dit qu’un scélérat vit dans un trou, retourne donc dans le tien.",
    " sale gredin ! Je vais t’occire ! ",
    " rassures-toi, tu es aussi charmant que vif d’esprit"
];

const compliments = [
    "Mon savoir est aussi vaste que les archives d'un mage ancestral!",
    "Ma puissance est aussi redoutable que celle d'un dragon gardant son trésor!",
    "Mon charisme brille comme une étoile parmi les cieux!",
    "Ma sagesse est aussi profonde que les racines d'un arbre millénaire!",
    "Ma bienveillance réchauffe les cœurs comme le soleil après l'hiver!",
    "Ma présence est aussi rassurante qu'un phare dans la nuit!",
    "Ma patience est aussi infinie que les étoiles dans le firmament!",
    "Ma modestie est aussi grande que les montagnes les plus hautes!",
    "Ma loyauté est aussi inébranlable que les fondations d'un château!",
    "Mon courage est aussi vaillant que celui d'un chevalier défiant un dragon!"
];


module.exports = {
    data : new SlashCommandBuilder()
        .setName("joute-verbale")
        .setDescription("Lance une joute verbale à quelqu'un")
        .addUserOption(option => option.setName("user").setDescription("La personne avec que tu veux jouter").setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser("user")
        if (target.id === "1100141622328557688") {
            await interaction.reply(
                `${compliments[Math.floor(Math.random() * compliments.length)]}`
              )
        }
        else {
            await interaction.reply(
                `${target}, ${jouteVerbale[Math.floor(Math.random() * jouteVerbale.length)]}`
              )
        }
    }
}
