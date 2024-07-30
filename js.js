
let iterations = 1000;

function strategy1(arr, result) {
    for (let i = 0; i < iterations; i++) {
        let rnd = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        let elem = '' + arr[rnd];
        result[elem]++;
    }
}

function strategy2(arr, result) {
    for (let i = 0; i < iterations; i++) {
        let rndInit = Math.floor(Math.random() * (2 - 0 + 1)) + 0; //initial door choice
        let rndSec = rndInit; //what the host shows us (an empty door)

        while (rndSec === rndInit || arr[rndSec] === 1) {
            rndSec = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        }
        
        let rndFinal = 3 - rndInit - rndSec; //the door we switch to (which supposedly has a 2/3 chance)
        // console.log(arr[rndInit], arr[rndSec], arr[rndFinal])
        let elem = '' + arr[rndFinal];
        result[elem]++;
    }
}

function giveaway(strategy) {
    let prizes = [1, 0, 0];

    let result = {
        '0' : 0,
        '1' : 0
    }

    if (strategy === 1) { //do not change door choice
        strategy1(prizes, result);
    }

    if (strategy === 2) { //change door choice
        strategy2(prizes, result);
    }

    let resultWeight = {
        '0' : Number(result['0'] / iterations * 100).toFixed(2)  + '%',
        '1' : Number(result['1'] / iterations * 100).toFixed(2) + '%'
    }

    return [result, resultWeight];
}

console.log('Strategy without door change: ', ...giveaway(1))
console.log('Strategy with door change: ', ...giveaway(2))