'use strict';

describe('CharacterService', function () {

    var service;

    beforeEach(angular.mock.module('main'));

    beforeEach(angular.mock.module(function ($provide) {
        $provide.constant('initialCharacters', []);
    }));

    beforeEach(angular.mock.inject(function (_CharacterService_) {
        service = _CharacterService_;
    }));

    it('deve conter caracteres vazios após a inicialização', function() {
        expect(service.characters.length).toBe(0);
    });

    it('deve adicionar um character', function () {
        service.addCharacter('Finalizar projeto de exemplo');
        expect(service.characters.length).toBe(1);
        expect(service.characters[0].label).toBe('Finalizar projeto de exemplo');
        expect(service.characters[0].done).toBe(false);
    });

    it('should toggle character', function () {
        service.addCharacter('Finalizar projeto de exemplo');
        expect(service.characters[0].done).toBe(false);

        service.toggleCharacter('Finalizar projeto de exemplo');
        expect(service.characters[0].done).toBe(true);

        service.toggleCharacter('Finalizar projeto de exemplo');
        expect(service.characters[0].done).toBe(false);
    });

    it('deve alternar o caractere', function () {
        service.addCharacter('Character1');
        service.addCharacter('Character2');
        service.addCharacter('Character3');
        expect(service.characters.length).toBe(3);

        service.toggleCharacter('Character1');
        service.removeDoneCharacters();
        expect(service.characters.length).toBe(2);
    });

});
