class SpoilTomatoes {

    constructor(grid) {
        this.grid = grid;
        this.getAdjacents = this.getAdjacents.bind(this)
        this.getRottenTomatoes = this.getRottenTomatoes.bind(this)
    };

    getRottenTomatoes() {
        const spoiltTomatoesLocations = [];
        let numGoodTomatoe = 0;
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                if (this.grid[row][col] === 2) {
                    spoiltTomatoesLocations.push([row, col])
                }
                if (this.grid[row][col] === 1) {
                    numGoodTomatoe++
                }
            }
        }
        return { numGoodTomatoe, spoiltTomatoesLocations };
    }

    getAdjacents(position, colLength, rowLength) {
        const [row, column] = position;
        const topAdjacent = row === 0 ? false : [row - 1, column];
        const rightAdjacent = column === colLength ? false : [row, column + 1];
        const bottomAdjacent = row === rowLength ? false : [row + 1, column];
        const leftAdjacent = column === 0 ? false : [row, column - 1]
        return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent]
            .filter(Boolean)
            .filter(([row, col]) => this.grid[row][col] === 1)
    }

    getTimeOfSpread() {

        const { spoiltTomatoesLocations, numGoodTomatoe } = this.getRottenTomatoes()

        if (!spoiltTomatoesLocations.length) {
            return -1
        }
        const visited = {};
        let counter = -1;
        let queue = [];
        const numOfBadTomatoes = spoiltTomatoesLocations.length;
        queue.push(...spoiltTomatoesLocations)

        while (queue.length) {
            counter++
            let arrOfBadTomatoes = [...queue];
            queue.length = 0;
            for (let i = 0; i < arrOfBadTomatoes.length; i++) {
                let badTomatoe = arrOfBadTomatoes[i];
                if (!visited[badTomatoe]) {
                    visited[badTomatoe] = true;
                    let [row,] = badTomatoe;
                    const adjacentTomatoes = this.getAdjacents(badTomatoe, this.grid[row].length - 1, this.grid.length - 1);
                    queue.push(...adjacentTomatoes)
                    queue = queue.filter(a => !visited[a])
                }
            }

        }

        return (Object.keys(visited).length < (numGoodTomatoe + numOfBadTomatoes)) ? -1 : counter
    }

}

module.exports = SpoilTomatoes;