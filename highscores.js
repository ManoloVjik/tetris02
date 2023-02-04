// It's High Scores check and save module - 04.02.2023

function checkHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

    if (score > lowestScore) {
        saveHighScore(score, highScores); //TODO
        showHighScores(); //TODO
    }
}

function saveHighScore(score, highScores) {
    const name = prompt('You got a HIGHSCORE!!! Enter your name: ');
    const newScore = {score, name, level};
    newScore.level = account.level;
    //console.log(newScore.level);

    // 1. Add to list
    highScores.push(newScore);

    // 2. Sort the list
    highScores.sort((a, b) => b.score - a.score);

    // 3. Select new list
    highScores.splice(NO_OF_HIGH_SCORES);

    // 4. Save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};

function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const highScoreList = document.getElementById(HIGH_SCORES);

    highScoreList.innerHTML = highScores.map((score) => 
    `<li>${score.score} - ${score.name} - lev.${score.level}`
    );
}