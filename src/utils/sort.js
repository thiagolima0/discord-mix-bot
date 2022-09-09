export const bringPlayersList = (playersList) =>
  playersList.map((player) => [player.name, Number(player.level)]);

export const showPlayersChat = (players, color) =>
  players
    .map((player) => `:${color}_circle: (${player[1]}) - ${player[0]}\n\n`)
    .join(" ");

export const showConfirmedPlayersChat = (players, color) =>
  players
    .map((player) => `:${color}_circle: (${player.level}) - ${player.name}\n\n`)
    .join(" ");

export const isPlayerConfirmed = (players, playerId) =>
  players.filter((player) => Number(player.id) === Number(playerId)).length;

export const findPlayeById = (players, playerId) =>
  players.findIndex((player) => player.id === playerId);
