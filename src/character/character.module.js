import angular from "angular";
import uirouter from "angular-ui-router";
import ngResource from "angular-resource";

import { routing } from "./character.config.js";
import { DEFAULT_CHARACTERS } from "./character.constants.js";
import { DEFAULT_ENV } from "../app/envs/app.env.js";

import CharacterService from "./services/character.service";
import CharacterComponent from "./character-component/character-component";
import template from "./character-component/character-component.tpl.html";

export default angular
    .module("main.app.character", [uirouter, ngResource])
    .config(routing)
    .component("characterComponent", {
        controller: CharacterComponent,
        template
    })
    .controller('characterController', ['$http','$scope', CharacterComponent])
    .service("CharacterService", CharacterService, [ngResource])
    .constant("appEnv", DEFAULT_ENV)
    .constant("initialCharacters", DEFAULT_CHARACTERS).name;
