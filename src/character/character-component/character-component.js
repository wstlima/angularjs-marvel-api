export default class CharacterComponent {
    constructor(CharacterService, $scope, $http, Lightbox) {
        this.comicsCurrentPage = null;
        this.charSelected = null;
        this.pageSize = 6; // for pagination
        this.loading = false; // for "loading..." GIF
        this.attributionHTML = null;
        this.characterName = null;
        this.comic = null;
        this.comics = null;
        this.comicsTotalItems = null;
        this.event = null;
        this.$http = $http;
        this.CharacterService = CharacterService;
        this.characters = CharacterService.characters;
        this.label = "";
        this.search = "";
        this.collapse = [true, true, true];
        this.noResults = null;
        this.Lightbox = Lightbox;
        this.$scope = $scope;
        this.monitor = false;
    }

    applyMonitor($scope, $http, CharacterService) {
        $scope.$watch(
            "comicsCurrentPage + pageSize + charSelected",
            function () {
                if ($scope.charSelected) {
                    var char = $scope.charSelected.data.results;
                    var current = $scope.comicsCurrentPage
                        ? $scope.comicsCurrentPage
                        : 1;

                    CharacterService.getComics(
                        $scope,
                        $http,
                        char[0].id,
                        current,
                        6
                    );
                } else {
                    $scope.comicsCurrentPage = null;
                }
            }
        );
    }

    selectPage(page) {
        if (page > 0) {
            if (!this.$scope.comicsCurrentPage) {
                this.$scope.comicsCurrentPage = 2;
            } else {
                this.$scope.comicsCurrentPage = page;
            }
        }
    }

    openLightboxModal(comic) {
        var url =
            comic.thumbnail.path.replace("http", "https") +
            "." +
            comic.thumbnail.extension;
        this.Lightbox.openModal([{ url: url, caption: comic.title }], 0);
    }

    loadCharacters(value) {
        var busca = value ? value : this.search;

        if (!this.monitor) {
            this.monitor = true;
            this.applyMonitor(this.$scope, this.$http, this.CharacterService);
        }

        Promise.all([
            this.CharacterService.loadCharacters(
                this.$scope,
                this.$http,
                busca
            )
        ])
            .then(() => {
                this.heroes = this.$scope.heroes.data.results;
                // this.attributionHTML = response.data.attributionHTML;
            })
            .catch();
    }

    getComic(resourceURI) {
        this.CharacterService.getComic(this.$scope, this.$http, resourceURI);
    }

    loadCharacter(id) {
        Promise.all([
            this.CharacterService.loadCharacter(
                this.$scope,
                this.$http,
                this.search,
                id
            )
        ])
            .then(() => {
                this.charSelected = this.$scope.charSelected.data.results;
                this.$scope.comicsCurrentPage = null;
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
