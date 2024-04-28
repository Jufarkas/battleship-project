import { Gameboard } from "./gameboardClass";
import { Ship } from "./shipClass";

const gameboard = new Gameboard;
const p1Carrier = new Ship('carrier', 5);
const p1Destroyer = new Ship('destroyer', 4);
const p1Battleship = new Ship('battleship', 3);
const p1Battleship2 = new Ship('battleship2', 3);
const p1LifeRaft = new Ship('lifeRaft', 1);


test('places battleship at array coordinates 61-63', () => {
    expect(gameboard.placeShip(p1Battleship, 61, 63)).toEqual([61, 62, 63])
});

test('places battleship2 at array coordinates 16-18', () => {
    expect(gameboard.placeShip(p1Battleship2, 16, 18)).toEqual([16, 17, 18])
});

test('places carrier at array coordinates 27-67', () => {
    expect(gameboard.placeShip(p1Carrier, 27, 67)).toEqual([27, 37, 47, 57, 67])
});

test('places destroyer at array coordinates 44-74', () => {
    expect(gameboard.placeShip(p1Destroyer, 44, 74)).toEqual([44, 54, 64, 74])
});

test('places lifeRaft at the 0th position', () => {
    expect(gameboard.placeShip(p1LifeRaft, 0, 0)).toEqual([0])
});

// test('lifeRaft exists', () => {
//     expect(gameboard.checkShipLocation(0)).toEqual(p1LifeRaft);
// })

// test('carrier exists', () => {
//     expect(gameboard.checkShipLocation(37)).toEqual(p1Carrier);
// })

// test('battleship exists', () => {
//     expect(gameboard.checkShipLocation(62)).toEqual(p1Battleship);
// })

// test('battleship2 exists', () => {
//     expect(gameboard.checkShipLocation(16)).toEqual(p1Battleship2);
// })

test('destroyer is hit', () => {
    expect(gameboard.receiveAttack(44)).toEqual('hit');
    expect(gameboard.receiveAttack(54)).toEqual('hit');
    expect(gameboard.receiveAttack(64)).toEqual('hit');
    expect(gameboard.receiveAttack(74)).toEqual('hit');
})

test('carrier is hit', () => {
    expect(gameboard.receiveAttack(57)).toBe('hit')
    expect(gameboard.receiveAttack(27)).toBe('hit')
    expect(gameboard.receiveAttack(37)).toBe('hit')
    expect(gameboard.receiveAttack(67)).toBe('hit')
    expect(gameboard.receiveAttack(47)).toBe('hit')
});

test('lifeRaft is hit', () => {
    expect(gameboard.receiveAttack(0)).toBe('hit')
});

test('battleship is hit', () => {
    expect(gameboard.receiveAttack(61)).toBe('hit')
    expect(gameboard.receiveAttack(62)).toBe('hit')
    expect(gameboard.receiveAttack(63)).toBe('hit')
});

test('location is empty, MISS', () => {
    expect(gameboard.receiveAttack(15)).toBe('lol you missed')
});

test('battleship2 is hit', () => {
    expect(gameboard.receiveAttack(16)).toBe('hit')
    expect(gameboard.receiveAttack(17)).toBe('hit')
    expect(gameboard.receiveAttack(18)).toBe('hit')
});

test('ships are all ded, game over', () => {
    expect(gameboard.checkGameStatus()).toBe('GAME OVER')
})