import { experiments } from "webpack";
import { Ship } from "./shipClass";

const newShip = new Ship('carrier', 5);
const anotherShip = new Ship('lifeRaft', 1);

test('ship is created, length 5', () => {
    expect(newShip).toEqual({name:'carrier', length: 5, orientation: 0, hits: 0, sunk: false});
});

test('another ship is created, length 1', () => {
    expect(anotherShip).toEqual({name: 'lifeRaft', length: 1, orientation: 0, hits: 0, sunk: false})
})

test('ship is hit', () => {
    expect(newShip.hit()).toEqual('hit');
    expect(newShip.hits).toEqual(1);
    console.log(newShip);
});

test('ship is hit again', () => {
    expect(newShip.hit()).toEqual('hit');
    expect(newShip.hits).toEqual(2);
    expect(newShip.hit()).toEqual('hit');
    expect(newShip.hits).toEqual(3);
    console.log(newShip);
});

test('anotherShip is sunk', () => {
    expect(anotherShip.hit()).toEqual('sunk');
    expect(anotherShip.sunk).toEqual(true);
    console.log(anotherShip);
});