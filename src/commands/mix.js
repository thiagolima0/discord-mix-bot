import { SlashCommandBuilder } from "discord.js";

const mixCommand = new SlashCommandBuilder()
  .setName("mix")
  .setDescription("Organiza sua lobby mix GC");

export default mixCommand.toJSON();
