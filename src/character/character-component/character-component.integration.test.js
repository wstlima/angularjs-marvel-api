import { assert } from 'chai';

import CharacterComponent from './character-component.js';
import CharacterService from '../services/character.service.js';

let component;

describe('CharacterComponent with real service (Integration test)', function() {

    beforeEach(function() {
        let initialCharacters = [];
        let characterService = new CharacterService(initialCharacters);
        component = new CharacterComponent(characterService);
    });

    it('should contain reference to service\'s characters', function () {
        assert.equal(component.characters.length, 0);
    });

    it('should add character', function () {
        component.label = 'Finish example project';
        component.addCharacter();
        assert.equal(component.label, '');
        assert.equal(component.characters.length, 1);
        assert.equal(component.characters[0].label, 'Finish example project');
        assert.equal(component.characters[0].done, false);
    });

    it('should toggle character', function () {
        component.label = 'Finish example project';
        component.addCharacter();
        assert.equal(component.characters[0].done, false);

        component.toggleCharacter(component.characters[0]);
        assert.equal(component.characters[0].done, true);

        component.toggleCharacter(component.characters[0]);
        assert.equal(component.characters[0].done, false);
    });

    it('should remove done characters', function () {
        component.label = 'Character1';
        component.addCharacter();

        component.label = 'Character2';
        component.addCharacter();

        component.label = 'Character2';
        component.addCharacter();

        assert.equal(component.characters.length, 3);

        component.toggleCharacter(component.characters[0]);
        component.removeDoneCharacters();
        assert.equal(component.characters.length, 2);
    });

});