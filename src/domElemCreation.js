export function createBody(){


// HEADER AND START GAME / RESTART GAME BUTTONS
const BODY = document.querySelector('body');
const newGameBtn = document.createElement('button');
newGameBtn.classList.add('newGameBtn');
newGameBtn.classList.add('hidden'); // WILL HAVE TO UNHIDE LATER, AS WE WANT TO USE THIS TO START GAME

const restartGameBtn = document.createElement('button');
restartGameBtn.classList.add('restartGameBtn');
restartGameBtn.classList.add('hidden'); // THE MASTER RESTART BUTTON ONCE A GAME IS OVER, could also potentially just re-use newGameBtn instead..

const headerDiv = document.createElement('div');
headerDiv.classList.add('header');

const headerH1 = document.createElement('h1');
headerH1.textContent = "BATTLESHIP";

BODY.appendChild(newGameBtn);
BODY.appendChild(restartGameBtn);
BODY.appendChild(headerDiv);
headerDiv.appendChild(headerH1);


// MAIN CONTENT CONTAINER WITH GAMEBOARDS AND GRID SQUARES
const mainContentContainerDiv = document.createElement('div');
mainContentContainerDiv.classList.add('mainContentContainer');

const gameboardContainer = document.createElement('div');
gameboardContainer.classList.add('gameboardContainer');

const gameboardOne = document.createElement('div');
gameboardOne.classList.add('gameboardOne');

const gameboardTwo = document.createElement('div');
gameboardTwo.classList.add('gameboardTwo');

const gameboardOneH2 = document.createElement('h2');
gameboardOneH2.classList.add('playerHeader');
gameboardOneH2.textContent = "Player One";

const gameboardTwoH2 = document.createElement('h2');
gameboardTwoH2.classList.add('playerHeader');
gameboardTwoH2.textContent = "Player Two";

const gameboardOneGrid = document.createElement('div');
gameboardOneGrid.classList.add('gridContainer');

const gameboardTwoGrid = document.createElement('div');
gameboardTwoGrid.classList.add('gridContainer');

// gameboardOne grid squares
for (let i = 0; i < 100; i++){
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('gameboardOneSquare');
    gridSquare.classList.add(`one${i}`)
    gameboardOneGrid.appendChild(gridSquare)
}

// gameboardTwo grid squares
for (let i = 0; i < 100; i++){
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('gameboardTwoSquare');
    gridSquare.classList.add(`two${i}`)
    gameboardTwoGrid.appendChild(gridSquare)
}

const p1ShipContainer = document.createElement('div');
p1ShipContainer.classList.add('shipContainer');
p1ShipContainer.classList.add('p1Ships');

const p1Carrier = document.createElement('div');
p1Carrier.classList.add('carrier');
p1Carrier.classList.add('p1');
p1Carrier.setAttribute('draggable', 'true');

const p1Destroyer = document.createElement('div');
p1Destroyer.classList.add('destroyer');
p1Destroyer.classList.add('p1');
p1Destroyer.setAttribute('draggable', 'true');

const p1Battleship1 = document.createElement('div');
p1Battleship1.classList.add('battleship1');
p1Battleship1.classList.add('p1');
p1Battleship1.setAttribute('draggable', 'true');

const p1Battleship2 = document.createElement('div');
p1Battleship2.classList.add('battleship2');
p1Battleship2.classList.add('p1');
p1Battleship2.setAttribute('draggable', 'true');

const p1DLifeRaft = document.createElement('div');
p1DLifeRaft.classList.add('lifeRaft');
p1DLifeRaft.classList.add('p1');
p1DLifeRaft.setAttribute('draggable', 'true');


const p2Carrier = document.createElement('div');
p2Carrier.classList.add('carrier');
p2Carrier.classList.add('p2');
p2Carrier.setAttribute('draggable', 'true');

const p2Destroyer = document.createElement('div');
p2Destroyer.classList.add('destroyer');
p2Destroyer.classList.add('p2');
p2Destroyer.setAttribute('draggable', 'true');

const p2Battleship1 = document.createElement('div');
p2Battleship1.classList.add('battleship1');
p2Battleship1.classList.add('p2');
p2Battleship1.setAttribute('draggable', 'true');

const p2Battleship2 = document.createElement('div');
p2Battleship2.classList.add('battleship2');
p2Battleship2.classList.add('p2');
p2Battleship2.setAttribute('draggable', 'true');

const p2DLifeRaft = document.createElement('div');
p2DLifeRaft.classList.add('lifeRaft');
p2DLifeRaft.classList.add('p2');
p2DLifeRaft.setAttribute('draggable', 'true');

const p2ShipContainer = document.createElement('div');
p2ShipContainer.classList.add('shipContainer');
p2ShipContainer.classList.add('p2Ships');

BODY.appendChild(mainContentContainerDiv);
mainContentContainerDiv.appendChild(gameboardContainer);

gameboardContainer.appendChild(gameboardOne);
gameboardOne.appendChild(gameboardOneH2);
gameboardOne.appendChild(gameboardOneGrid);
gameboardOne.appendChild(p1ShipContainer);
p1ShipContainer.appendChild(p1Carrier);
p1ShipContainer.appendChild(p1Destroyer);
p1ShipContainer.appendChild(p1Battleship1);
p1ShipContainer.appendChild(p1Battleship2);
p1ShipContainer.appendChild(p1DLifeRaft);

gameboardContainer.appendChild(gameboardTwo);
gameboardTwo.appendChild(gameboardTwoH2);
gameboardTwo.appendChild(gameboardTwoGrid);
gameboardTwo.appendChild(p2ShipContainer);
p2ShipContainer.appendChild(p2Carrier);
p2ShipContainer.appendChild(p2Destroyer);
p2ShipContainer.appendChild(p2Battleship1);
p2ShipContainer.appendChild(p2Battleship2);
p2ShipContainer.appendChild(p2DLifeRaft);
}