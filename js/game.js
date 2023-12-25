//הגדרת משתמשים גלובליים
let randumNumbersArr = [];//מערך מספרים שנבחרו באופן רנדומלי עי המחשב
const colorArr = ["red", "blue", "yellow", "green", "purple", "palevioletred"];//מערך הצבעים האפשריים
let cumputerChoosenColorCode = [];//מערך הצבעים של הקוד
let globalColor = "global";
let userPlayNow = JSON.parse(localStorage.getItem('currentUser'));
let time = 1;
let timerFlag = false;
let colorsThatWherChosenByUser = [];
let myBlack = 0;
let myWhite = 0;
let counterTheNumberOfSteps = 0;
let wasHintUse = false;
let myPlace = 97;//הערך האסקי של a

// קריאה לפונקציה המפעילה את הדף ומתחילה אותו
inStart();

//פונקציה המתחילה את הפעלת המשחק ומאפשרת המשך משחק קיים
function inStart() {
    header();
    document.querySelectorAll('#balls button').forEach(btn => btn.addEventListener('click', colorChangeDepend))
    document.querySelectorAll('.level div').forEach(btn => btn.addEventListener('click', colorChangePlay))
    document.querySelectorAll('.checkMe').forEach(btn => btn.addEventListener('click', checkmeFunction))
    document.querySelector('#toStartGame').addEventListener('click', startGame);
    document.querySelector('#toStartNewGame').addEventListener('click', startGame);
    document.querySelector('#toStartNewGameAfterFinish').addEventListener('click', toStartNewGameAfterWinOrFail);
    document.querySelector('#toContinue').addEventListener('click', myContinue)
    document.querySelector('#hint').addEventListener('click', hint);
    console.log(`cumputerChoosenColorCode${userPlayNow.email}`);
    if (localStorage.getItem(`cumputerChoosenColorCode${userPlayNow.email}`) && userPlayNow.email !== "guest@gmail.com") {
        ContinueOrStartNewGame();
    } else {
        instructions();
    }
}

//פונקציה המדפיסה למסך את שמו מס הנצחונות והשיא של המשתמש הנוכחי
function header() {
    let user = document.getElementById('name');
    user.innerHTML = `<i class="fa-solid fa-user" ><br>שלום ${userPlayNow.name}</i>`
    let timing = document.getElementById('yourHigh');
    let theBestUserTime = userPlayNow.heightScoure;
    let second = theBestUserTime % 60;
    let minute = Math.floor(theBestUserTime / 60);
    let zeroSeconds = "";
    if (second < 10)
        zeroSeconds = "0";
    let zerominets = "";
    if (minute < 10)
        zerominets = "0"
    timing.innerHTML = `  <i class="fa-solid fa-trophy"><br>  המשחק המהיר שלך  ${zerominets}${minute}:${zeroSeconds}${second} </i>`;
    let theUserWins = userPlayNow.numOfWins;
    let wins = document.getElementById('score');
    wins.innerHTML = ` <i class="fa-solid fa-medal" ><br> מספר הנצחונות שלך ${theUserWins}</i>`;
}

//פונקציית שעוןעצר המחשבת את הזמן שעובר ומדפיסה אותו 
function timmer() {
    let timmer = document.getElementById("timmer")
    let seeTimmer = setInterval(() => {
        let second = time % 60;
        let minute = Math.floor(time / 60);
        let zeroSeconds = "";
        if (second < 10)
            zeroSeconds = "0";
        let zerominutes = "";
        if (minute < 10)
            zerominutes = "0"
        timmer.innerHTML = ` <i class="fa-solid fa-clock" ><br>${zerominutes}${minute}:${zeroSeconds}${second}</i>`;
        time++;
        localStorage.setItem(`timer${userPlayNow.email}`, time);
        if (timerFlag) {
            clearInterval(seeTimmer);
        }
    }, 1000)
}

//פונקציה המפעילה את הרמז
function hint() {
    if (wasHintUse === false) {
        let randomNumber = Math.ceil(Math.random() * (4)) - 1;
        let myLevel = document.getElementById(String.fromCharCode(myPlace)).querySelectorAll('div');
        myLevel[randomNumber].style.background = cumputerChoosenColorCode[randomNumber];
        window.setTimeout(() => {
            myLevel[randomNumber].style.background = "white";
        }, 1000);
        wasHintUse = true;
    }

}

//פונקציה היוצרת עיגול קטן בצבע הנבחר שנגרר עם העכבר
function cruserChange() {
    let cruserMove = document.getElementById("curser");
    document.addEventListener('mousemove', myCurser);
    cruserMove.className = ("cruser");
    function myCurser(e) {
        cruserMove.style.background = globalColor;
        let x = e.clientX;
        let y = e.clientY;
        cruserMove.style.left = `${x}px`;
        cruserMove.style.top = `${y}px`;
    }

}

//פונקציה השואלת את המשתמש האם הוא רוצה להמשיך במשחק הקודם או להתחיל משחק חדש
function ContinueOrStartNewGame() {
    let instructions = document.querySelector('#ContinueOrStartNewGame');
    instructions.className = ('ContinueOrStartNewGame');
}

//הוראות למשחק שלא נעלמות עד ללחיצה על כפתור התחלת משחק
function instructions() {
    let instructions = document.querySelector('#instructions');
    instructions.className = ('instructions');
}

//במקרה של משחק חדש, מפעיל אותו
function startGame() {
    document.querySelector('#instructions').className = ('displayNon');
    document.querySelector('#ContinueOrStartNewGame').className = ('displayNon');
    newGame();
}

//לאחר שמשחק נגמר מפעיל משחק חדש
function toStartNewGameAfterWinOrFail() {
    document.querySelector('#youWonAndGameOver').className = ('displayNon');
    location.assign("../html/game.html");
}

//פונקציה הממשיכה את המשחק במקרה של הפסקה
function myContinue() {
    let ContinueOrStartNewGame = document.querySelector('#ContinueOrStartNewGame');
    ContinueOrStartNewGame.className = ('displayNon');
    cumputerChoosenColorCode = JSON.parse(localStorage.getItem(`cumputerChoosenColorCode${userPlayNow.email}`));
    console.log(cumputerChoosenColorCode);
    counterTheNumberOfSteps = localStorage.getItem(`theNumberOfSteps${userPlayNow.email}`);
    time = localStorage.getItem(`timer${userPlayNow.email}`);
    timmer();
    continueCode();
    continuePlaying();
}

//פונקציה המייצרת את הכדורים שהמחשב בחר בתוך פונקצית ההמשך
function continueCode() {
    let computerChoose = document.querySelector('#gameBord');
    let newFigure = document.createElement('figure');
    newFigure.className = ("computerBalls");
    computerChoose.append(newFigure);
    let newFigure2 = document.createElement('figure');
    newFigure2.className = ("ballsSorfece");
    newFigure.append(newFigure2);
    for (let i = 0; i < 4; i++) {
        let newDiv = document.createElement('div');
        newDiv.className = cumputerChoosenColorCode[i];
        newFigure2.append(newDiv);
    }
    let newFigure1 = document.createElement('figure');
    newFigure1.className = ("ballsCover");
    newFigure.append(newFigure1);
}

//פונקציה שצובעת את הכדורים ומנקדת את הניקוד בפונקצית המשך
function continuePlaying() {
    let continuePlaying = JSON.parse(localStorage.getItem(userPlayNow.email));
    for (let i = 0; i < counterTheNumberOfSteps; i++) {
        let colorsThatWherChosenByUser = continuePlaying[i].stageColorsThatWherChosen;
        console.log(colorsThatWherChosenByUser);
        let myLevel = document.getElementById(String.fromCharCode(myPlace)).querySelectorAll('div');
        for (let j = 0; j < 4; j++) {
            myLevel[j].style.background = colorsThatWherChosenByUser[j];
        }
        myBlack = continuePlaying[i].black;
        myWhite = continuePlaying[i].white;
        createBlackAndWhite(String.fromCharCode(myPlace));
        myPlace++;
    }
}


//פונקציה המפעליה משחק חדש
function newGame() {
    for (let i = 0; i < 4; i++) {
        let randomNumber = Math.ceil(Math.random() * (6 - i)) - 1;
        randumNumbersArr[i] = randomNumber;
    }
    createCode();
    localStorage.setItem(userPlayNow.email, "[]");
    time = 1;
    timmer();
}

//פונקציה היוצרת את הקוד ע"י הגרלת מספרים באופן רנדומאלי
function createCode() {
    let computerChoose = document.querySelector('#gameBord');
    let newFigure = document.createElement('figure');
    newFigure.className = ("computerBalls");
    computerChoose.append(newFigure);
    let newFigure2 = document.createElement('figure');
    newFigure2.className = ("ballsSorfece");
    newFigure.append(newFigure2);
    localStorage.setItem(`cumputerChoosenColorCode${userPlayNow.email}`, '[]');
    for (let i = 0; i < 4; i++) {
        newFigure2.append(createBall(randumNumbersArr[i]));
        colorArr.splice(randumNumbersArr[i], 1);
    }
    console.log(cumputerChoosenColorCode)
    let newFigure1 = document.createElement('figure');
    newFigure1.className = ("ballsCover");
    newFigure.append(newFigure1);
}


//פונקציה היוצרת את העיגולים בקוד
function createBall(num) {
    let newDiv = document.createElement('div');
    newDiv.className = colorArr[num];
    cumputerChoosenColorCode.push(colorArr[num]);
    let oldcumputerChoosenColorCode = JSON.parse(localStorage.getItem(`cumputerChoosenColorCode${userPlayNow.email}`));
    oldcumputerChoosenColorCode.push(colorArr[num]);
    localStorage.setItem(`cumputerChoosenColorCode${userPlayNow.email}`, JSON.stringify(oldcumputerChoosenColorCode));
    return newDiv;

}

//משנה את הצבע הגלובלי לצבע שנבחר
function colorChangeDepend(e) {//פטונקציה שמחליפה את הצבע הגלובלי לצבע שנלחץ
    makeNoise("click");
    globalColor = e.target.dataset.color;
    cruserChange();
}

//פונקציה שמחליפה אץ העיגול הספציפי לצבע שנלחץ 
function colorChangePlay(e) {
    if ((e.target.closest('.level').id).charCodeAt(0) === myPlace) {
        document.getElementById(e.target.dataset.creat).style.backgroundColor = globalColor;
        globalColor = "color";
        document.getElementById('curser').className = ("displayNon");
        makeNoise("click");
        playChekmeButten(e);
    }
}

//מפעיל את כפתור בדוק אותי
function playChekmeButten(e) {
    let level = e.target.closest('.level').id;
    console.log(level);
    let levelHTML = document.getElementById(level);
    let checkMeDiv = levelHTML.querySelectorAll('div');
    let counter = 4;
    for (let i = 0; i < checkMeDiv.length; i++) {
        if (checkMeDiv[i].style.backgroundColor === "") {
            counter--;
        }
    }
    if (counter === 4) {
        let checkMeButten = levelHTML.querySelector('button')
        checkMeButten.className = ("checkMeAfter");
    }

}

//בדיקת המשחק וניקוד
function checkmeFunction(e) {
    let chekingNow = e.target.dataset.check;
    choosenColors(chekingNow);
    countBlackAndWhite();
    upLoadStorage();
    createBlackAndWhite(chekingNow);
    this.className = ("displayNon")
    if (myBlack === 4) {
        iWon();
        myPlace = 105;
        return;
    }
    myPlace++;
    if (myPlace === 104) {
        gameOver();
    }
    counterTheNumberOfSteps++;
    localStorage.setItem(`theNumberOfSteps${userPlayNow.email}`, counterTheNumberOfSteps)
}

//יצירת מערך של הצבעים שנבחרו באמצעות המשתמש בסבב זה
function choosenColors(chekingNow) {
    colorsThatWherChosenByUser = [];
    let level = document.getElementById(chekingNow);
    let balls = level.querySelectorAll('div');
    balls.forEach(element => {
        colorsThatWherChosenByUser.push(element.style.backgroundColor);
    });
    console.log(colorsThatWherChosenByUser);

}

//בדיקה של הצבעים שהמשתמש הכניס בהשוואה לקוד שנבחר וספירת מספר הלבנים והשחורים לסבב זה 
function countBlackAndWhite() {
    myBlack = 0;
    myWhite = 0;
    for (let i = 0; i < cumputerChoosenColorCode.length; i++) {
        if (cumputerChoosenColorCode[i] === colorsThatWherChosenByUser[i])
        myBlack++;
        else {
            for (let j = 0; j < colorsThatWherChosenByUser.length; j++) {
                if (cumputerChoosenColorCode[i] === colorsThatWherChosenByUser[j]) {
                    myWhite++;
                    break;
                }
            }
        }
    }
}

//מעדכן את הלוקל סטורג במערך הצבעים שהמשתמש בחר ובמספר השחורים והלבנים שלו בסבב זה
function upLoadStorage() {
    let stage = {
        stageColorsThatWherChosen: colorsThatWherChosenByUser,
        black: myBlack,
        white: myWhite,
    };
    let oldStage = JSON.parse(localStorage.getItem(userPlayNow.email));
    console.log(oldStage);
    oldStage.push(stage);
    localStorage.setItem(userPlayNow.email, JSON.stringify(oldStage));
}
// יצירת עיגולים שחורים ולבנים בהתאם למספר מהפונקציה הקודמת
function createBlackAndWhite(idName) {
    let mycounter = 1;
    let bool = document.getElementById(idName);
    let scoure = bool.querySelector('article');
    scoure.classList.add("scoure");
    for (let i = 0; i < myBlack; i++) {
        let newDiv = document.createElement('div');
        newDiv.style.backgroundColor = "black"
        newDiv.className = (`ball${mycounter}`);
        scoure.append(newDiv);
        mycounter++;
    }
    for (let j = 0; j < myWhite; j++) {
        let newDiv = document.createElement('div');
        newDiv.style.backgroundColor = "white"
        newDiv.className = (`ball${mycounter}`);
        scoure.append(newDiv);
        mycounter++;
    }
    while (mycounter !== 5) {
        let newDiv = document.createElement('div');
        newDiv.style.backgroundColor = "rgba(123, 118, 118, 0.95)"
        newDiv.className = (`ball${mycounter}`);
        scoure.append(newDiv);
        mycounter++;
    }
}

//פונקציה המופעלת במקרה של ניצחון
function iWon() {
    timerFlag = true;
    let users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === userPlayNow.email) {
            userPlayNow.numOfWins++;
            if (time < userPlayNow.heightScoure || userPlayNow.heightScoure === 0) {
                userPlayNow.heightScoure = time;
                
            }
            users.splice(i, 1,userPlayNow);
            localStorage.setItem('currentUser', JSON.stringify(userPlayNow));
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    console.log("you won");
    makeNoise("youWon");
    document.querySelector(".ballsCover").className = ("displayNon")
    let weenMessage = document.querySelector(".confetti");
    weenMessage.className = ('iWon');
    window.setTimeout(() => {
        weenMessage.className = ('displayNon');
        youWonAndGameOverMessage();
    }, 9000);
    localStorage.setItem(userPlayNow, JSON.stringify(userPlayNow));
    removeLocalStoreg();
}

//פונקציה המופעלת במקרה של כישלון-הקוד לא פוצח לאחר שבע סיבובים
function gameOver() {
    console.log("Game over");
    timerFlag = true;
    removeLocalStoreg();
    makeNoise("gameOver");
    youWonAndGameOverMessage();
}

//פונקציה המוחקת הלוקל סטורג את המידע על המשחק שנגמר ברגע זה
//הפונקציה נקראת במקרה של כישלון\ניצחון 
function removeLocalStoreg() {
    localStorage.removeItem(userPlayNow.email);
    localStorage.setItem(`cumputerChoosenColorCode${userPlayNow.email}`, "");
    localStorage.removeItem(`theNumberOfSteps${userPlayNow.email}`);
}

//הודעה למשתמש בסיום משחק ע"י ניצחון או כישלון
function youWonAndGameOverMessage() {
    document.querySelector('#youWonAndGameOver').className = ('youWonAndGameOver');
}

//פונקציה המפעילה צלילים
function makeNoise(name) {
    audioEl = document.createElement("audio");
    audioEl.src = `../audio/${name}.wav`;
    audioEl.playbackRate = 1;
    audioEl.autoplay = "true";
    document.body.appendChild(audioEl);
}