export const matchTeams = (data) => {
  const teamA = [];
  const teamB = [];
  const selectionProbability = 0.5;

  data.sort(function (playerA, playerB) {
    if (playerA[1] < playerB[1]) {
      return 1;
    }

    if (playerA[1] > playerB[1]) {
      return -1;
    }

    return 0;
  });

  let sum = function (team) {
    if (team.length === 0) {
      return 0;
    }
    let i,
      s = 0;
    for (i = 0; i < team.length; i++) {
      s += team[i][1];
    }
    return s;
  };

  let chooseTeam = function () {
    if (Math.random() < selectionProbability) {
      return "teamA";
    }
    return "teamB";
  };

  function assignTeams() {
    let i;
    for (i = 0; i < data.length; i++) {
      let sumA = sum(teamA),
        sumB = sum(teamB);
      // first pass, we'll have a 50/50 chance
      // of placing the best player in either team A or team B

      if (i === 0) {
        let chosenTeam = chooseTeam();
        if (chosenTeam === "teamA") {
          teamA.push(data[i]);
        } else {
          teamB.push(data[i]);
        }
      } else if (sumA < sumB) {
        teamA.push(data[i]);
      } else {
        teamB.push(data[i]);
      }
    }
  }

  assignTeams();

  return [teamA, teamB];
};

export default matchTeams