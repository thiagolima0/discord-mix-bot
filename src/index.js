import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";
import pingCommand from "./commands/ping.js";
import mixCommand from "./commands/mix.js";
import matchTeams from "./utils/matchTeams.js";
import { onReady, onChatInputCommand } from "./events/index.js";
import { onButtonCustomId } from "./events/onButtonCustomId.js";
import { winRate } from "./utils/winRate.js";
import embeds from "./components/embeds.js";
import { bringPlayersList, showPlayersChat } from "./utils/sort.js";

config();

const { token, clientId } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let confirmedPlayers = [];
let messageChat = {};
let userId = 0;

const rest = new REST({ version: "10" }).setToken(token);
const commands = [pingCommand, mixCommand];

client.on("ready", async () => await onReady(client));

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    await onChatInputCommand(interaction);

    userId = interaction.user.id;
    confirmedPlayers = [];
    messageChat = {};
  } else if (interaction.isButton()) {
    if (Number.isInteger(+interaction.customId)) {
      messageChat = await onButtonCustomId(
        interaction,
        confirmedPlayers,
        messageChat
      );
    } else {
      if (
        interaction.customId === "confirmar" &&
        userId === interaction.user.id
      ) {
        const teams = matchTeams(bringPlayersList(confirmedPlayers));

        const [teamA, teamB] = teams

        if (teamA.length && teamB.length) {
          const [winRateA, winRateB] = winRate(teams);

          const embedTeamA = {
            title: "Lobby 1",
            description: showPlayersChat(teamA, 'blue'),
            color: "Blue",
            footer: `Probabilidade de Vitória: ${winRateA}%`,
          };

          const embedTeamB = {
            title: "Lobby 2",
            description: showPlayersChat(teamB, 'orange'),
            color: "Orange",
            footer: `Probabilidade de Vitória: ${winRateB}%`,
          };

          messageChat = await interaction.channel.send({
            embeds: [embeds(embedTeamA), embeds(embedTeamB)],
            ephemeral: true,
          });

          await interaction.deferUpdate();

        } else {
          await interaction.reply(
            "Antes de confirmar é preciso ter a lista de confirmados"
          );
        }
      }
    }
  }
});

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.login(token);
