import angular from "angular";
import uirouter from "angular-ui-router";
import ngResource from "angular-resource";
import { routing } from "./app.config.js";
import AppComponent from "./app-component/app-component";
import template from "./app-component/app-component.tpl.html";
import typeahead from "angular-ui-bootstrap/src/typeahead/index-nocss.js";
import 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js';

export default angular
    .module("main.app", [uirouter, ngResource, typeahead, 'bootstrapLightbox'])
    .config(routing)
    .config([
        "$resourceProvider",
        function ($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }
    ])
    .component("appComponent", { controller: AppComponent, template }).name;
