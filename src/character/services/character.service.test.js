import { assert } from 'chai';

import CharacterService from './character.service.js';

let service;

describe('CharacterService', function() {

    beforeEach(function() {
        let initialCharacters = [];
        service = new CharacterService(initialCharacters);
    });

    it('should contain empty characters after initialization', function () {
        assert.equal(service.characters.length, 0);
    });

    it('should add character', function () {
        service.addCharacter('Finish example project');
        assert.equal(service.characters.length, 1);
        assert.equal(service.characters[0].label, 'Finish example project');
        assert.equal(service.characters[0].done, false);
    });

    it('should toggle character', function () {
        service.addCharacter('Finish example project');
        assert.equal(service.characters[0].done, false);

        service.toggleCharacter('Finish example project');
        assert.equal(service.characters[0].done, true);

        service.toggleCharacter('Finish example project');
        assert.equal(service.characters[0].done, false);
    });

    it('should remove done characters', function () {
        service.addCharacter('Character1');
        service.addCharacter('Character2');
        service.addCharacter('Character3');
        assert.equal(service.characters.length, 3);

        service.toggleCharacter('Character1');
        service.removeDoneCharacters();
        assert.equal(service.characters.length, 2);
    });

});