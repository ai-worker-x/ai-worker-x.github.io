const testStart = document.getElementById('test-start');
const testQuestion = document.getElementById('test-question');
const testResult = document.getElementById('test-result');
const leaderboard = document.getElementById('leaderboard');
const type1Btn = document.getElementById('type1');
const type2Btn = document.getElementById('type2');
const type3Btn = document.getElementById('type3');
const type4Btn = document.getElementById('type4');
const type5Btn = document.getElementById('type5');
const type6Btn = document.getElementById('type6');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit');
const resultEl = document.getElementById('result');
const lastResultEl = document.getElementById('last-result');
const analysisEl = document.getElementById('analysis');
const correctCountEl = document.getElementById('correct-count');
const wrongCountEl = document.getElementById('wrong-count');
const currentQuestionEl = document.getElementById('current-question');
const accuracyEl = document.getElementById('accuracy');
const timeTakenEl = document.getElementById('time-taken');
const currentRankEl = document.getElementById('current-rank');
const congratulationEl = document.getElementById('congratulation');
const nicknameLabel = document.getElementById('nickname-label');
const nicknameInput = document.getElementById('nickname');
const saveResultBtn = document.getElementById('save-result');
const backToMainFromQuestion = document.getElementById('back-to-main-from-question');
const backToMainFromResult = document.getElementById('back-to-main-from-result');
const backToMainFromLeaderboard = document.getElementById('back-to-main-from-leaderboard');
const leaderboardTable = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
const closeLeaderboardBtn = document.getElementById('close-leaderboard');
const leaderboardTypeSelect = document.getElementById('leaderboard-type');

let currentType;
let correctAnswer;
let correctCount = 0;
let wrongCount = 0;
let currentQuestion = 1;
let startTime;
let endTime;
let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || {};

type1Btn.addEventListener('click', () => {
    currentType = 1;
    startTest();
});

type2Btn.addEventListener('click', () => {
    currentType = 2;
    startTest();
});

type3Btn.addEventListener('click', () => {
    currentType = 3;
    startTest();
});

type4Btn.addEventListener('click', () => {
    currentType = 4;
    startTest();
});

type5Btn.addEventListener('click', () => {
    currentType = 5;
    startTest();
});

type6Btn.addEventListener('click', () => {
    currentType = 6;
    startTest();
});

leaderboardBtn.addEventListener('click', () => {
    testStart.classList.add('hidden');
    leaderboard.classList.remove('hidden');
    displayLeaderboard();
});

function startTest() {
    testStart.classList.add('hidden');
    testQuestion.classList.remove('hidden');
    correctCount = 0;
    wrongCount = 0;
    currentQuestion = 1;
    correctCountEl.textContent = 0;
    wrongCountEl.textContent = 0;
    currentQuestionEl.textContent = 1;
    startTime = Date.now();
    generateQuestion();
}

function generateQuestion() {
    let num1, num2;
    switch (currentType) {
        case 1:
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            break;
        case 2:
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 10);
            break;
        case 3:
            num1 = Math.floor(Math.random() * 900) + 100;
            num2 = Math.floor(Math.random() * 10);
            break;
        case 4:
            num1 = Math.floor(Math.random() * 9000) + 1000;
            num2 = Math.floor(Math.random() * 10);
            break;
        case 5:
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 90) + 10;
            break;
        case 6:
            const integerPart = Math.floor(Math.random() * 9) + 1;
            const decimalPart = Math.random().toFixed(2).slice(2);
            num1 = parseFloat(`${integerPart}.${decimalPart}`);
            num2 = Math.floor(Math.random() * 10) + 1;
            break;
    }
    correctAnswer = parseFloat((num1 * num2).toFixed(2));
    const question = `${num1} × ${num2} = `;
    questionEl.textContent = question;
    answerInput.value = '';
    resultEl.textContent = '';
    analysisEl.textContent = '';
    analysisEl.classList.add('hidden');
}

submitBtn.addEventListener('click', () => {
    const userAnswer = parseFloat(answerInput.value);
    const question = questionEl.textContent;
    if (userAnswer === correctAnswer) {
        resultEl.textContent = '回答正确！';
        correctCount++;
        correctCountEl.textContent = correctCount;
    } else {
        resultEl.textContent = `回答错误，正确答案是 ${correctAnswer}`;
        wrongCount++;
        wrongCountEl.textContent = wrongCount;
        showAnalysis(question, correctAnswer);
    }
    lastResultEl.textContent = `上一题: ${question} 你的答案: ${userAnswer} 结果: ${resultEl.textContent}`;
    currentQuestion++;
    currentQuestionEl.textContent = currentQuestion;
    if (currentQuestion > 10) {
        endTest();
    } else {
        generateQuestion();
    }
});

function showAnalysis(question, answer) {
    const numbers = question.match(/\d+\.?\d*/g);
    const num1 = parseFloat(numbers[0]);
    const num2 = parseFloat(numbers[1]);
    let analysis = '';
    switch (currentType) {
        case 1:
            analysis = `分析：直接根据乘法口诀计算 ${num1} × ${num2} = ${answer}。`;
            break;
        case 2:
            analysis = `分析：将 ${num1} 拆分为十位和个位，即 ${Math.floor(num1 / 10)}0 和 ${num1 % 10}。先计算 ${Math.floor(num1 / 10)}0 × ${num2} = ${Math.floor(num1 / 10) * num2 * 10}，再计算 ${num1 % 10} × ${num2} = ${(num1 % 10) * num2}，最后将两个结果相加，${Math.floor(num1 / 10) * num2 * 10} + ${(num1 % 10) * num2} = ${answer}。`;
            break;
        case 3:
            analysis = `分析：将 ${num1} 拆分为百位、十位和个位，即 ${Math.floor(num1 / 100)}00、${Math.floor((num1 % 100) / 10)}0 和 ${num1 % 10}。分别计算它们与 ${num2} 的乘积，再将结果相加。即 ${Math.floor(num1 / 100)}00 × ${num2} = ${Math.floor(num1 / 100) * num2 * 100}，${Math.floor((num1 % 100) / 10)}0 × ${num2} = ${Math.floor((num1 % 100) / 10) * num2 * 10}，${num1 % 10} × ${num2} = ${(num1 % 10) * num2}，最终结果为 ${Math.floor(num1 / 100) * num2 * 100}+${Math.floor((num1 % 100) / 10) * num2 * 10}+${(num1 % 10) * num2} = ${answer}。`;
            break;
        case 4:
            analysis = `分析：将 ${num1} 拆分为千位、百位、十位和个位，依次计算各部分与 ${num2} 的乘积，再求和。如 ${Math.floor(num1 / 1000)}000 × ${num2} = ${Math.floor(num1 / 1000) * num2 * 1000}，${Math.floor((num1 % 1000) / 100)}00 × ${num2} = ${Math.floor((num1 % 1000) / 100) * num2 * 100}，${Math.floor((num1 % 100) / 10)}0 × ${num2} = ${Math.floor((num1 % 100) / 10) * num2 * 10}，${num1 % 10} × ${num2} = ${(num1 % 10) * num2}，总和为 ${answer}。`;
            break;
        case 5:
            analysis = `分析：可以使用乘法分配律，将 ${num1} 拆分为 ${Math.floor(num1 / 10)}0 + ${num1 % 10}，${num2} 拆分为 ${Math.floor(num2 / 10)}0 + ${num2 % 10}。先计算 ${Math.floor(num1 / 10)}0 × ${Math.floor(num2 / 10)}0 = ${Math.floor(num1 / 10) * Math.floor(num2 / 10) * 100}，${Math.floor(num1 / 10)}0 × ${num2 % 10} = ${Math.floor(num1 / 10) * (num2 % 10) * 10}，${num1 % 10} × ${Math.floor(num2 / 10)}0 = ${(num1 % 10) * Math.floor(num2 / 10) * 10}，${num1 % 10} × ${num2 % 10} = ${(num1 % 10) * (num2 % 10)}，最后将四个结果相加，即 ${Math.floor(num1 / 10) * Math.floor(num2 / 10) * 100}+${Math.floor(num1 / 10) * (num2 % 10) * 10}+${(num1 % 10) * Math.floor(num2 / 10) * 10}+${(num1 % 10) * (num2 % 10)} = ${answer}。`;
            break;
        case 6:
            analysis = `分析：可以先不考虑小数点，将 ${num1} 当作整数 ${num1.toString().replace('.', '')} 与 ${num2} 相乘，得到 ${(num1.toString().replace('.', '') * num2).toFixed(0)}。因为 ${num1} 有两位小数，所以从结果的右边数出两位点上小数点，即 ${answer}。`;
            break;
    }
    analysisEl.textContent = analysis;
    analysisEl.classList.remove('hidden');
}

function endTest() {
    endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    const accuracy = (correctCount / 10) * 100;
    accuracyEl.textContent = accuracy.toFixed(2);
    timeTakenEl.textContent = totalTime.toFixed(2);
    testQuestion.classList.add('hidden');
    testResult.classList.remove('hidden');
    const { rank, isNewBest, isTop10 } = saveResult(accuracy, totalTime);
    currentRankEl.textContent = rank;
    if (isNewBest) {
        congratulationEl.textContent = '恭喜你，刷新了该类型的最好成绩！继续加油哦！';
        congratulationEl.classList.remove('hidden');
    } else {
        congratulationEl.classList.add('hidden');
    }
    if (isTop10) {
        nicknameLabel.classList.remove('hidden');
        nicknameInput.classList.remove('hidden');
        saveResultBtn.classList.remove('hidden');
    } else {
        saveResultLocally(accuracy, totalTime, '匿名', new Date().toLocaleString());
    }
}

function saveResult(accuracy, totalTime) {
    if (!leaderboardData[currentType]) {
        leaderboardData[currentType] = [];
    }
    const newEntry = { accuracy, totalTime };
    leaderboardData[currentType].push(newEntry);
    leaderboardData[currentType].sort((a, b) => {
        if (a.accuracy !== b.accuracy) {
            return b.accuracy - a.accuracy;
        }
        return a.totalTime - b.totalTime;
    });
    leaderboardData[currentType] = leaderboardData[currentType].slice(0, 10);
    let rank = leaderboardData[currentType].findIndex(entry => entry === newEntry) + 1;
    let isNewBest = false;
    let isTop10 = rank <= 10;
    if (rank === 1) {
        const previousBest = leaderboardData[currentType][1];
        if (!previousBest || (accuracy > previousBest.accuracy || (accuracy === previousBest.accuracy && totalTime < previousBest.totalTime))) {
            isNewBest = true;
        }
    }
    return { rank, isNewBest, isTop10 };
}

saveResultBtn.addEventListener('click', () => {
    const nickname = nicknameInput.value || '匿名';
    const accuracy = parseFloat(accuracyEl.textContent);
    const timeTaken = parseFloat(timeTakenEl.textContent);
    const testDate = new Date().toLocaleString();
    saveResultLocally(accuracy, totalTime, nickname, testDate);
    nicknameLabel.classList.add('hidden');
    nicknameInput.classList.add('hidden');
    saveResultBtn.classList.add('hidden');
});

function saveResultLocally(accuracy, totalTime, nickname, testDate) {
    if (!leaderboardData[currentType]) {
        leaderboardData[currentType] = [];
    }
    const newEntry = { accuracy, timeTaken, nickname, testDate };
    leaderboardData[currentType].push(newEntry);
    leaderboardData[currentType].sort((a, b) => {
        if (a.accuracy !== b.accuracy) {
            return b.accuracy - a.accuracy;
        }
        return a.totalTime - b.totalTime;
    });
    leaderboardData[currentType] = leaderboardData[currentType].slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
}

function displayLeaderboard() {
    const selectedType = leaderboardTypeSelect.value;
    leaderboardTable.innerHTML = '';
    const typeData = leaderboardData[selectedType] || [];
    typeData.forEach((entry, index) => {
        const row = document.createElement('tr');
        const rankCell = document.createElement('td');
        const nicknameCell = document.createElement('td');
        const accuracyCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const dateCell = document.createElement('td');

        rankCell.textContent = index + 1;
        nicknameCell.textContent = entry.nickname;
        accuracyCell.textContent = entry.accuracy.toFixed(2) + '%';
        timeCell.textContent = entry.timeTaken.toFixed(2);
        dateCell.textContent = entry.testDate;

        rankCell.classList.add('border', 'border-gray-400', 'p-2');
        nicknameCell.classList.add('border', 'border-gray-400', 'p-2');
        accuracyCell.classList.add('border', 'border-gray-400', 'p-2');
        timeCell.classList.add('border', 'border-gray-400', 'p-2');
        dateCell.classList.add('border', 'border-gray-400', 'p-2');

        row.appendChild(rankCell);
        row.appendChild(nicknameCell);
        row.appendChild(accuracyCell);
        row.appendChild(timeCell);
        row.appendChild(dateCell);
        leaderboardTable.appendChild(row);
    });
}

leaderboardTypeSelect.addEventListener('change', displayLeaderboard);

backToMainFromQuestion.addEventListener('click', () => {
    testQuestion.classList.add('hidden');
    testStart.classList.remove('hidden');
});

backToMainFromResult.addEventListener('click', () => {
    testResult.classList.add('hidden');
    testStart.classList.remove('hidden');
});

backToMainFromLeaderboard.addEventListener('click', () => {
    leaderboard.classList.add('hidden');
    testStart.classList.remove('hidden');
});

closeLeaderboardBtn.addEventListener('click', () => {
    leaderboard.classList.add('hidden');
    testStart.classList.remove('hidden');
});    