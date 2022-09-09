import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const button = (buttonsArray) =>
  new ActionRowBuilder().setComponents(
    buttonsArray.map((item) =>
      new ButtonBuilder()
        .setCustomId(item.toLowerCase())
        .setLabel(item)
        .setStyle(ButtonStyle.Primary)
    )
  );

export default button;
