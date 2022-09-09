import buttons from "../components/buttons.js";

export const onChatInputCommand = async (interaction) => {
  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (interaction.commandName === "mix") {
    await interaction.reply({
      content: "Selecione o seu level GC",
      components: [buttons(["1", "2", "3", "4", "5"])],
    });
    await interaction.channel.send({
      components: [buttons(["6", "7", "8", "9", "10"])],
    });
    await interaction.channel.send({
      components: [buttons(["11", "12", "13", "14", "15"])],
    });
    await interaction.channel.send({
      components: [buttons(["16", "17", "18", "19", "20"])],
    });
    await interaction.channel.send({
      components: [buttons(["Confirmar"])],
    });
  }
};