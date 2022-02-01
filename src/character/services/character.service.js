import * as _ from "lodash";
import MD5 from "crypto-js/md5";

export default class CharacterService {
    constructor(initialCharacters, appEnv) {
        this.characters = initialCharacters;
        this.publickey = appEnv.publickey;
        this.privatekey = appEnv.privatekey;
    }

    urlGenerator(baseUrl, limit, offset, nameStartsWith) {
        var ts = new Date().getTime();
        var stringToHash = ts + this.privatekey + this.publickey;
        var hash = MD5(stringToHash).toString();
        var url =
            baseUrl +
            "?limit=" +
            limit +
            "&offset=" +
            offset +
            "&ts=" +
            ts +
            "&apikey=" +
            this.publickey +
            "&hash=" +
            hash;
        url = nameStartsWith ? url + "&nameStartsWith=" + nameStartsWith : url;
        return url;
    }

    loadCharacters($scope, $http, nameStartsWith) {
        $scope.charSelected = null;
        const url = this.urlGenerator(
            "https://gateway.marvel.com:443/v1/public/characters",
            10,
            0,
            nameStartsWith
        );
        return $http
            .get(url)
            .success(function (data) {
                $scope.heroes = data;
            })
            .error(function () {
                // log error
            });
    }

    loadCharacter($scope, $http, nameStartsWith, id) {
        $scope.charSelected = null;
        const url = this.urlGenerator(
            `https://gateway.marvel.com:443/v1/public/characters/` + id,
            1,
            0,
            nameStartsWith
        );
        return $http
            .get(url)
            .success(function (data) {
                $scope.charSelected = data;
            })
            .error(function () {
                // log error
            });
    }

    getComic($scope, $http, resourceURI) {
        resourceURI = resourceURI.replace("http://", "https://");
        var ts = new Date().getTime();
        var stringToHash = ts + this.privatekey + this.publickey;
        var hash = MD5(stringToHash).toString();

        return $http
            .get(resourceURI, {
                params: { ts: ts, apikey: this.publickey, hash: hash, limit: 1 }
            })
            .then(
                function (response) {
                    // success
                    $scope.event = null;
                    $scope.comic = response.data.data.results[0];
                },
                function (response) {
                    return response; 
                }
            );
    }

    getComics($scope, $http, characterId) {
        $scope.loading = true;
        var ts = new Date().getTime();
        var stringToHash = ts + this.privatekey + this.publickey;
        var hash = MD5(stringToHash).toString();

        return $http
            .get(
                "https://gateway.marvel.com/v1/public/characters/" +
                    characterId +
                    "/comics",
                {
                    params: {
                        ts: ts,
                        apikey: this.publickey,
                        hash: hash,
                        format: "comic",
                        orderBy: "onsaleDate",
                        limit: $scope.pageSize,
                        offset:
                            ($scope.comicsCurrentPage - 1) * $scope.pageSize
                    }
                }
            )
            .then(
                function (response) {
                    // success
                    $scope.comicsTotalItems = response.data.data.total;
                    $scope.comics = response.data.data.results;
                    $scope.loading = false;
                },
                function (response) {
                    return response; 
                }
            );
    }

    addCharacter(label) {
        let character = {
            label,
            done: false
        };
        this.characters.push(character);
    }

    toggleCharacter(label) {
        let toggledCharacter = _.find(this.characters, function (character) {
            return character.label === label;
        });
        toggledCharacter.done = !toggledCharacter.done;
    }

    removeDoneCharacters() {
        _.remove(this.characters, function (character) {
            return character.done;
        });
    }
}
