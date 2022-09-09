import { EmbedBuilder } from "discord.js";

export const embeds = (embed) =>
  new EmbedBuilder()
    .setDescription(embed.description)
    .setTitle(embed.title)
    .setColor(embed.color)
    .setFooter({ text: embed.footer });

export default embeds;
