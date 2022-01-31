import * as sinon from 'sinon';

import CharacterComponent from './character-component.js';
import CharacterService from '../services/character.service.js';

let component;
let mockCharacterService;

describe('CharacterComponent mockando o serviço (unit test)', function() {

    beforeEach(function() {
        let initialCharacters = [];
        let CharacterServiceInstance = new CharacterService(initialCharacters);
        mockCharacterService = sinon.mock(CharacterServiceInstance);
        component = new CharacterComponent(CharacterServiceInstance);
    });

    afterEach(function() {
        mockCharacterService.restore();
    });

    it('should add character', function () {
        mockCharacterService
            .expects('addCharacter')
            .once()
            .withArgs('Finish example project');

        component.label = 'Finish example project';
        component.addCharacter();

        mockCharacterService.verify();
    });

    it('should toggle character', function () {
        let mockCharacter = {label: 'Add unit tests', done: false};
        mockCharacterService
            .expects('toggleCharacter')
            .twice()
            .withArgs(mockCharacter.label);

        component.toggleCharacter(mockCharacter);
        component.toggleCharacter(mockCharacter);

        mockCharacterService.verify();
    });

    it('should remove done characters', function () {
        mockCharacterService
            .expects('removeDoneCharacters')
            .once();

        component.removeDoneCharacters();

        mockCharacterService.verify();
    });

});