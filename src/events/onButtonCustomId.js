import embeds from "../components/embeds.js";
import {
  findPlayeById,
  isPlayerConfirmed,
  showConfirmedPlayersChat,
} from "../utils/sort.js";

export const onButtonCustomId = async (
  interaction,
  playersChat,
  messageChat
) => {
  const { user, customId, channel } = interaction;

  if (playersChat.length === 0) {
    playersChat.push({
      id: user.id,
      name: user.username,
      level: customId,
    });

    const embedConfirmation = {
      title: "Confirmados",
      description: showConfirmedPlayersChat(playersChat, "green"),
      color: "Green",
      footer: `Total: ${playersChat.length} ${
        playersChat.length === 10 ? "MAX" : ""
      }`,
    };

    messageChat = await channel.send({
      embeds: [embeds(embedConfirmation)],
      ephemeral: true,
    });
    await interaction.deferUpdate();
  } else if (playersChat.length > 0 && playersChat.length <= 9) {
    const playerObj = {
      id: user.id,
      name: user.username,
      level: customId,
    };

    if (isPlayerConfirmed(playersChat, user.id)) {
      const playerIndex = findPlayeById(playersChat, user.id);
      playersChat[playerIndex] = playerObj;
    } else {
      playersChat.push(playerObj);
    }

    const embedEdit = {
      title: "Confirmados",
      description: showConfirmedPlayersChat(playersChat, "green"),
      color: "Green",
      footer: `Total: ${playersChat.length} ${
        playersChat.length === 10 ? "MAX" : ""
      }`,
    };

    await messageChat.edit({
      embeds: [embeds(embedEdit)],
      ephemeral: true,
    });
    await interaction.deferUpdate();
  }

  return messageChat;
};
