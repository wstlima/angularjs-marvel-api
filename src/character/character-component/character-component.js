export default class CharacterComponent {
    constructor(CharacterService, $scope, $http) {
        this.pageSize = 6; // for pagination
        this.loading = false; // for "loading..." GIF
        this.attributionHTML=null;
        this.characterName=null;
        this.comic=null;
        this.comics=null;
        this.comicsTotalItems = 0;
        this.comicsCurrentPage = 1; 
        this.event=null;
        this.$scope = $scope;
        this.$http = $http;
        this.CharacterService = CharacterService;
        this.characters = CharacterService.characters;
        this.label = "";
        this.search = "";
        this.charSelected = "";
        this.collapse = [true, true, true];
        this.noResults = null;
    }

    loadCharacters(value) {
        var busca = value?value:this.search;
        Promise.all([
            this.CharacterService.loadCharacters(this.$scope, this.$http, busca)
        ])
            .then(() => {
                this.heroes = this.$scope.heroes.data.results;
                this.noResults = this.$scope.heroes.data.resultslength ? false : true;
            })
            .catch();
    }

    getComic(resourceURI){
        this.CharacterService.getComic(this.$scope, this.$http, resourceURI)
    }

    loadCharacter(id) {
        Promise.all([
            this.CharacterService.loadCharacter(this.$scope, this.$http, this.search, id),
            this.CharacterService.getComics(this.$scope, this.$http, id)
        ])
            .then(() => {
                this.charSelected = this.$scope.charSelected.data.results;
            })
            .catch();
    }

    addCharacter() {
        this.CharacterService.addCharacter(this.label);
        this.label = "";
    }

    toggleCharacter(character) {
        this.CharacterService.toggleCharacter(character.label);
    }

    removeDoneCharacters() {
        this.CharacterService.removeDoneCharacters();
    }

    toggleCollapse(index) {
        let originalValue = this.collapse[index];
        this.collapse.forEach((item, i) => {
            this.collapse[i] = true;
        });
        this.collapse[index] = !originalValue;
    }
}
