import { TestScheduler } from 'jest'
import {
    getIdFromUrl,
    getAnimatedShinyImageFromId
} from './utils'

// describe('This is how to group tests' () => {

//     test('describe test', ()=> {
//         let input = 'What to send inn';
//     output = sendInnFunction(input);
//     expect(output).toBe("Expectet Test Result");
//     });

// })

describe('Get Id from url', () => {
    test('should find id from url', () => {
        let input = `https://pokeapi.co/api/v2/pokemon/2`;
        let output = getIdFromUrl(input);
        expect(output).toBe("2");
    });
    test('should send inn id to url', () => {
        let input = "1";
        let output = getAnimatedShinyImageFromId(input);
        expect(output).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`);
    });
    
});
