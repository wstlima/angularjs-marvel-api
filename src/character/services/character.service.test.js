import { assert } from 'chai';

import CharacterService from './character.service.js';

let service;

describe('CharacterService', function() {

    beforeEach(function() {
        let initialCharacters = [];
        service = new CharacterService(initialCharacters);
    });

    it('deve conter caracteres vazios após a inicialização', function () {
        assert.equal(service.characters.length, 0);
    });

    it('deve adicionar um character', function () {
        service.addCharacter('Finalizar projeto');
        assert.equal(service.characters.length, 1);
        assert.equal(service.characters[0].label, 'Finalizar projeto');
        assert.equal(service.characters[0].done, false);
    });

    it('deve alternar o caractere', function () {
        service.addCharacter('Finalizar projeto');
        assert.equal(service.characters[0].done, false);

        service.toggleCharacter('Finalizar projeto');
        assert.equal(service.characters[0].done, true);

        service.toggleCharacter('Finalizar projeto');
        assert.equal(service.characters[0].done, false);
    });

    it('deve remover os caracteres sinalizados como prontos', function () {
        service.addCharacter('Character1');
        service.addCharacter('Character2');
        service.addCharacter('Character3');
        assert.equal(service.characters.length, 3);

        service.toggleCharacter('Character1');
        service.removeDoneCharacters();
        assert.equal(service.characters.length, 2);
    });

});