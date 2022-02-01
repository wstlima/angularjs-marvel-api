import { assert } from 'chai';

import CharacterComponent from './character-component.js';
import CharacterService from '../services/character.service.js';

let component;

describe('CharacterComponent com serviço real (teste de integração)', function() {

    beforeEach(function() {
        let initialCharacters = [];
        let characterService = new CharacterService(initialCharacters);
        component = new CharacterComponent(characterService);
    });

    it('deve conter referência aos serviços do caracter', function () {
        assert.equal(component.characters.length, 0);
    });

    it('deve adicionar caracter', function () {
        component.label = 'Finalizar projeto';
        component.addCharacter();
        assert.equal(component.label, '');
        assert.equal(component.characters.length, 1);
        assert.equal(component.characters[0].label, 'Finalizar projeto');
        assert.equal(component.characters[0].done, false);
    });

    it('deve alternar o caractere', function () {
        component.label = 'Finalizar projeto';
        component.addCharacter();
        assert.equal(component.characters[0].done, false);

        component.toggleCharacter(component.characters[0]);
        assert.equal(component.characters[0].done, true);

        component.toggleCharacter(component.characters[0]);
        assert.equal(component.characters[0].done, false);
    });

    it('deve remover os caracteres sinalizados como prontos', function () {
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