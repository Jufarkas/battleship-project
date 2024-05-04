const BODY = document.querySelector('body');

export function createBody(){


// HEADER AND START GAME / RESTART GAME BUTTONS
const headerDiv = document.createElement('div');
headerDiv.classList.add('header');

const headerH1 = document.createElement('h1');
headerH1.textContent = "BATTLESHIP";

const headerPara = document.createElement('p');
headerPara.textContent = "*** Right click a ship change orientation when placing your ships";

const newGameBtn = document.createElement('button');
newGameBtn.textContent = "NEW GAME";
newGameBtn.classList.add('newGameBtn');

BODY.appendChild(headerDiv);
BODY.appendChild(newGameBtn);
headerDiv.appendChild(headerH1);
headerDiv.appendChild(headerPara);


// MAIN CONTENT CONTAINER WITH GAMEBOARDS AND GRID SQUARES
const mainContentContainerDiv = document.createElement('div');
mainContentContainerDiv.classList.add('mainContentContainer');
mainContentContainerDiv.classList.add('hidden');

const gameboardContainer = document.createElement('div');
gameboardContainer.classList.add('gameboardContainer');

const gameboardOne = document.createElement('div');
gameboardOne.classList.add('gameboardOne');

const gameboardTwo = document.createElement('div');
gameboardTwo.classList.add('gameboardTwo');
gameboardTwo.classList.add('hidden');

const gameboardOneH2 = document.createElement('h2');
gameboardOneH2.classList.add('playerHeader');
gameboardOneH2.textContent = "Player One";

const gameboardTwoH2 = document.createElement('h2');
gameboardTwoH2.classList.add('playerHeader');
gameboardTwoH2.textContent = "Player Two";

const gameboardOneGrid = document.createElement('div');
gameboardOneGrid.classList.add('gridContainer');
gameboardOneGrid.classList.add('p1');

const gameboardTwoGrid = document.createElement('div');
gameboardTwoGrid.classList.add('gridContainer');
gameboardTwoGrid.classList.add('p2');

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


// Dialog Box for player switching

const nextPlayerDialog = document.createElement('dialog');
nextPlayerDialog.classList.add('nextPlayerDialog');
nextPlayerDialog.textContent = 'PASS TO NEXT PLAYER. NEXT PLAYER HIT "CONTINUE" WHEN READY';

const nextDialogContainer = document.createElement('div');
nextDialogContainer.classList.add('nextDialogContainer')

const dialogContinueBtn = document.createElement('button');
dialogContinueBtn.classList.add('continueBtn');
dialogContinueBtn.textContent = "CONTINUE";

const startGameDialog = document.createElement('dialog');
startGameDialog.classList.add('startGameDialog');
startGameDialog.textContent = "IT'S TIME... PASS BACK TO PLAYER ONE AND GET READY TO FIRE ZE MISSILEZ!"

const startDialogContainer = document.createElement('div');
startDialogContainer.classList.add('startDialogContainer')

const startGameBtn = document.createElement('button');
startGameBtn.classList.add('startGameBtn')
startGameBtn.textContent = "START GAME";


BODY.appendChild(nextPlayerDialog);
nextPlayerDialog.appendChild(nextDialogContainer);
nextDialogContainer.appendChild(dialogContinueBtn);

BODY.appendChild(startGameDialog);
startGameDialog.appendChild(startDialogContainer);
startDialogContainer.appendChild(startGameBtn)

 for(let i = 1; i < 3; i++){
    let turnFinBtnContainer = document.createElement('div');
    let turnFinBtn = document.createElement('button');
    turnFinBtnContainer.classList.add(`p${i}TurnFinContainer`);
    turnFinBtnContainer.classList.add('hidden');
    turnFinBtn.classList.add(`p${i}TurnFinBtn`);
    turnFinBtn.textContent = "TURN FINISHED";
    BODY.appendChild(turnFinBtnContainer);
    turnFinBtnContainer.appendChild(turnFinBtn);
 }

const p1TurnFinContainer = document.querySelector('.p1TurnFinContainer');
const p2TurnFinContainer = document.querySelector('.p2TurnFinContainer');

p1ShipContainer.appendChild(p1TurnFinContainer);
p2ShipContainer.appendChild(p2TurnFinContainer);

}


export function gameOverProtocol(){
    const gameOverDialog = document.createElement('dialog');
    gameOverDialog.classList.add('gameOverDialog');
    gameOverDialog.textContent = "GAME OVER";

    const restartGameBtn = document.createElement('button');
    restartGameBtn.classList.add('restartGameBtn');
    restartGameBtn.textContent = `LET'S GO AGAIN!`
    
    BODY.appendChild(gameOverDialog);
    gameOverDialog.appendChild(restartGameBtn);

    gameOverDialog.showModal();

    restartGameBtn.addEventListener('click', () => {
        gameOverDialog.close();
        location.reload();
    });
}