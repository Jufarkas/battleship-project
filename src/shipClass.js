export class Ship {
    constructor(name, length, hits = 0, sunk = false){
        this.name = name;
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit(){
        this.hits++;
        if(this.hits !== this.length){
            return 'hit';
        } else {
            this.sunk = true;
            return 'sunk';
        }
    }
}