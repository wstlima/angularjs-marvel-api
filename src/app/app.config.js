export function routing($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/character');

    $stateProvider
        .state('app', {
            abstract: true,
            template: '<app-component></app-component>'
        })

}
