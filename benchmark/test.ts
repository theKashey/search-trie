// @ts-ignore
import Benchmark from 'benchmark';
import {buildCharacterTrie, buildWordTrie} from '../src';

const suite = new Benchmark.Suite();


// chat GPT
function generateRandomDirectoryStructure(N:number, M:number) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'; // Define characters for parts
    const parts = [];

    // Generate random directory parts
    for (let i = 0; i < N; i++) {
        let part = '';
        const partLength = Math.floor(Math.random() * M) + 1;

        for (let j = 0; j < partLength; j++) {
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            part += randomChar;
        }

        parts.push(part);
    }

    // Construct the directory structure
    const structure = [];
    let currentPath = '';

    for (const part of parts) {
        currentPath += (currentPath ? '.' : '') + part;
        structure.push(currentPath);
    }

    return structure;
}


const createSuite = (name: string, M: number) => {
    const lines = generateRandomDirectoryStructure(10, M);
    const rlines = [
        // modify to get different seeds from
        // - all not found
        // - all found
        // - mixed case
        ...generateRandomDirectoryStructure(lines.length/8,M),
        ...lines.slice(0, lines.length/8)
        ].map(s =>
        // "clean a string" by producing a new one to mitigate js engine optimization giving benefits to array search
        // it "obviously" can find a string it already seen somewhere
        // also - add a tail to every string, because this is an operation (find prefix) we want to benchmark
        (' ' + s+'/y/z').slice(1)
    );
    const rwlines = rlines.map(x => x.split('.'));

    const cdata = lines.map(x => ({key: x, value: x}))
    const wdata = lines.map(x => ({key: x.split('.'), value: x}))

    const ct = buildCharacterTrie(cdata);
    const wt = buildWordTrie(wdata);

    suite.add('char ' + name, () => {
        rlines.forEach(line => ct.findNearest(line))
    });

    suite.add('word ' + name, () => {
        rwlines.forEach(line => wt.findNearest(line))
    });

    suite.add('brute ' + name, () => {
        rlines.forEach(line => lines.find(x => x.startsWith(line)))
    });
}

// createSuite('short', 1);
createSuite('med', 10);
// createSuite('long', 50);

suite.on('cycle', (e:any) => console.log(String(e.target)));
suite.on('complete', function() {
    // @ts-ignore
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})

suite.run({async: true});