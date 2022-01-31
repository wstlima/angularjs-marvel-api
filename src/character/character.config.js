export function routing($stateProvider) {

    $stateProvider
        .state('app.character', {
            url: '/character',
            template: '<character-component></character-component>'
        });
}