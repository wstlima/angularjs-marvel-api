import * as sinon from 'sinon';

import CharacterComponent from './character-component.js';
import CharacterService from '../services/character.service.js';

let component;
let mockCharacterService;

describe('CharacterComponent mockando o serviço (teste unitário)', function() {

    beforeEach(function() {
        let initialCharacters = [];
        let CharacterServiceInstance = new CharacterService(initialCharacters);
        mockCharacterService = sinon.mock(CharacterServiceInstance);
        component = new CharacterComponent(CharacterServiceInstance);
    });

    afterEach(function() {
        mockCharacterService.restore();
    });

    it('deve adicionar um character', function () {
        mockCharacterService
            .expects('addCharacter')
            .once()
            .withArgs('Finalizar projeto');

        component.label = 'Finalizar projeto';
        component.addCharacter();

        mockCharacterService.verify();
    });

    it('deve alternar o caractere', function () {
        let mockCharacter = {label: 'Add unit tests', done: false};
        mockCharacterService
            .expects('toggleCharacter')
            .twice()
            .withArgs(mockCharacter.label);

        component.toggleCharacter(mockCharacter);
        component.toggleCharacter(mockCharacter);

        mockCharacterService.verify();
    });

    it('deve remover os caracteres sinalizados como prontos', function () {
        mockCharacterService
            .expects('removeDoneCharacters')
            .once();

        component.removeDoneCharacters();

        mockCharacterService.verify();
    });

});