const playerTurnLbl = document.querySelector(".player-turn-lbl");
const playerOneNameField = document.querySelector(".playerone-name-field");
const playerTwoNameField = document.querySelector(".playertwo-name-field"); 
const gameStartBtn = document.querySelector(".game-start-btn");
const playerOneScorePara = document.querySelector(".player-one-score");
const playerTwoScorePara = document.querySelector(".player-two-score");
const startContainer = document.querySelector(".start-container");
const cardContainer = document.querySelector(".card-container");
const game = document.querySelector(".memory-game");
const card = document.querySelector(".card");
const cards = document.querySelectorAll(".card");
const header = document.querySelector("header");
const gameRestartBtn = document.querySelector(".game-restart-btn");
let playerOneName;
let playerTwoName;
let gameTurn = 0;
let currentPlayer;
let players;

   //Generate the cards in array 
   const cardsArray = [
    {imgSrc: "./images/1.jpg", 
     name: "bee"
    },
    {imgSrc: "./images/2.jpg", 
     name: "butterfly"
    },
    {imgSrc: "./images/3.jpg", 
     name: "cow"
    },
    {imgSrc: "./images/4.jpg", 
     name: "deer"
    }, 
    {imgSrc: "./images/5.jpg", 
    name: "dog"
    },
    {imgSrc: "./images/6.jpg", 
    name: "frog"
    },
    {imgSrc: "./images/7.jpg", 
    name: "jellyfish"
    },
    {imgSrc: "./images/8.jpg", 
    name: "koala"
    },
    {imgSrc: "./images/9.jpg", 
     name: "owl"
    },
    {imgSrc: "./images/10.jpg", 
     name: "pig"
    },
    {imgSrc: "./images/11.jpg", 
    name: "snake"
   },
   {imgSrc: "./images/12.jpg", 
    name: "whale"
   },
   {imgSrc: "./images/1.jpg", 
     name: "bee"
    },
    {imgSrc: "./images/2.jpg", 
     name: "butterfly"
    },
    {imgSrc: "./images/3.jpg", 
     name: "cow"
    },
    {imgSrc: "./images/4.jpg", 
     name: "deer"
    }, 
    {imgSrc: "./images/5.jpg", 
    name: "dog"
    },
    {imgSrc: "./images/6.jpg", 
    name: "frog"
    },
    {imgSrc: "./images/7.jpg", 
    name: "jellyfish"
    },
    {imgSrc: "./images/8.jpg", 
    name: "koala"
    },
    {imgSrc: "./images/9.jpg", 
     name: "owl"
    },
    {imgSrc: "./images/10.jpg", 
     name: "pig"
    },
    {imgSrc: "./images/11.jpg", 
    name: "snake"
   },
   {imgSrc: "./images/12.jpg", 
    name: "whale"
   }
];
randomize(cardsArray);

function randomize(array) {
    for (let i = 0; i < array.length; i++) {
        let random = Math.floor(Math.random() * (i + 1))
        let temp = array[random];
        array[random] = array[i];
        array[i] = temp;
    }
    return array;
    }

function handleStart() {
     playerOneName = playerOneNameField.value;
     playerTwoName = playerTwoNameField.value;
     let playerOne = {
        name: playerOneName,
        score: 0
    };
    
    let playerTwo = {
        name: playerTwoName,
        score: 0
    };

    players = [playerOne, playerTwo];

     updateDisplays(players);
     createCards();
     game.style.display="block";
     startContainer.style.display ="none";
     
    return playerOne, playerTwo;
}     

gameStartBtn.addEventListener("click", handleStart);

// Update displays of current player and score info 
function updateDisplays(players) {
        currentPlayer = players[gameTurn];
        playerTurnLbl.innerText = currentPlayer.name;
        playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
        playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
    }

// Create the elements in HTML
function createCards() {
    cardsArray.forEach((item) => {
        const card = document.createElement("div");
        const front = document.createElement("img");
        const back = document.createElement("div"); 
        card.classList.add("card");
        card.setAttribute("name", item.name);
        front.classList.add("front");
        back.classList.add("back");
        front.src = item.imgSrc;
        back.innerText = "?";

        card.addEventListener("click", () => {
            let selectedCards = document.querySelectorAll(".selectedCard");
            if (selectedCards.length < 3) {
                card.classList.toggle("selectedCard");
                checkCards();

            }
        });
  // Insert the cards to the cardContainer(div)
        cardContainer.append(card);
        card.append(front,back);
    })
}

function updateScores() {
    currentPlayer.score = currentPlayer.score + 1;
    if (gameTurn == 0) {
        playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
    } else {
        playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
    }
 }

 function displayWinner(){
    if (players[0].score + players[1].score == cardsArray.length / 2) {
        if (players[0].score > players[1].score) {
            header.innerText =`${players[0].name} vann!`;
            triggerConfetti();
            restartGame();
         } else if (players[0].score < players[1].score){
            header.innerText =`${players[1].name} vann!`;
            triggerConfetti();
            restartGame();
         } else {
            header.innerText = "Oavgjort!";
            triggerHandshake();
            restartGame();
         } 
    }
 }

function triggerConfetti() {
    // 先尝试使用 confetti.js 库
    if (typeof ConfettiGenerator !== 'undefined') {
        const confettiSettings = {
            target: 'confetti-canvas',
            max: 200,
            size: 1,
            animate: true,
            props: ['circle', 'square'],
            colors: [[255, 215, 0], [255, 223, 0], [218, 165, 32], [184, 134, 11], [255, 250, 205]],
            clock: 25,
            interval: null,
            rotate: false,
            start_velocity: 25,
            velocity_decay: 0.85
        };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        setTimeout(() => confetti.clear(), 4000);
    }
    
    // 添加金币符号
    createMoneyElements();
}

function createMoneyElements() {
    const moneySymbols = ['💰', '💵', '💴', '💶', '💷', '🤑'];
    
    for (let i = 0; i < 150; i++) {
        const money = document.createElement('div');
        money.textContent = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
        money.style.position = 'fixed';
        money.style.left = Math.random() * 100 + '%';
        money.style.top = '-50px';
        money.style.fontSize = Math.random() * 25 + 35 + 'px';
        money.style.pointerEvents = 'none';
        money.style.zIndex = '9998';
        money.style.setProperty('--x-offset', (Math.random() - 0.5) * 500 + 'px');
        money.className = 'falling-money';
        
        document.body.appendChild(money);
        
        setTimeout(() => money.remove(), 3500);
    }
}

function triggerHandshake() {
    const handshakeContainer = document.createElement('div');
    handshakeContainer.style.position = 'fixed';
    handshakeContainer.style.top = '50%';
    handshakeContainer.style.left = '50%';
    handshakeContainer.style.transform = 'translate(-50%, -50%)';
    handshakeContainer.style.fontSize = '120px';
    handshakeContainer.style.zIndex = '9998';
    handshakeContainer.style.pointerEvents = 'none';
    handshakeContainer.textContent = '🤝';
    
    document.body.appendChild(handshakeContainer);
    
    // 握手动画
    const keyframes = [
        { transform: 'translate(-50%, -50%) scale(0.3) rotate(-30deg)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1, offset: 0.3 },
        { transform: 'translate(-50%, -50%) scale(1.2) rotate(10deg)', opacity: 1, offset: 0.5 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(-10deg)', opacity: 1, offset: 0.7 },
        { transform: 'translate(-50%, -50%) scale(0.8) rotate(0deg)', opacity: 0 }
    ];
    
    handshakeContainer.animate(keyframes, {
        duration: 3000,
        easing: 'ease-in-out'
    });
    
    setTimeout(() => handshakeContainer.remove(), 3000);
}
     
// Check cards if they match
const checkCards = () => {
    const selectedCards = document.querySelectorAll(".selectedCard");
    if(selectedCards.length == 2) {
        // If two cards match
        if (selectedCards[0].getAttribute("name") == selectedCards[1].getAttribute("name")) {
            selectedCards.forEach((card) => {
                setTimeout(() => card.classList.remove("selectedCard"),1000);
               setTimeout(() => card.style.visibility = "hidden", 1000);

            });
  updateScores();
  displayWinner();
           
       } else { // If two cards don't match
            selectedCards.forEach((card) => {
                setTimeout(() => card.classList.remove("selectedCard"),1000);
               
            });
            gameTurn = (gameTurn + 1) % 2; // Switch to another player
            currentPlayer  = players[gameTurn];
            playerTurnLbl.innerText = currentPlayer.name;
           };
        }
}

function restartGame() {
    gameRestartBtn.style.visibility = "visible";
}
