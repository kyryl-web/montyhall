
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
        let rndInit = Math.floor(Math.random() * (2 - 0 + 1)) + 0; //начальный выбор двери
        let rndSec = rndInit; //то, то нам показывает ведущий (пустая дверь)
        if (arr[rndInit] === 1) {
            while (rndSec === rndInit) {
                rndSec = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
            }
        }
        if (arr[rndInit] === 0) {
            while (rndSec === rndInit || arr[rndSec] === 1) {
                rndSec = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
            }
        }
        
        let rndFinal = rndSec; //дверь, на кторую мы меняем наш начальный выбор (у которой якобы 2/3 шанс)
        while (rndFinal === rndSec || rndFinal === rndInit) {
            rndFinal = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        }
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

    if (strategy === 1) { //не меняем выбор двери
        strategy1(prizes, result);
    }

    if (strategy === 2) { //меняем выбор двери
        strategy2(prizes, result);
    }

    let resultWeight = {
        '0' : Number(result['0'] / iterations * 100).toFixed(2)  + '%',
        '1' : Number(result['1'] / iterations * 100).toFixed(2) + '%'
    }

    return [result, resultWeight];
}

console.log(...giveaway(1))