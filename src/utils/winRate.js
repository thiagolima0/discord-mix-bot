export const winRate = (data) => {
  const media = data[0].reduce((p, current) => {
    return current[1] + p;
  }, 0);
  media;

  const media2 = data[1].reduce((p, current) => {
    return current[1] + p;
  }, 0);

  const total = media / 5;
  const total2 = media2 / 5;

  const teamA = ((total - total2) * 100) / total;
  const teamB = ((total2 - total) * 100) / total2;

  const percentA = teamA + 50;
  const percentB = teamB + 50;

  const winRateA = Number(percentA).toFixed(2);
  const winRateB = Number(percentB).toFixed(2);

  return [winRateA, winRateB];
};
