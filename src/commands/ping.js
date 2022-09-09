import { SlashCommandBuilder } from "discord.js";

const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Retorna pong");

export default pingCommand.toJSON();
