// poi controller
// var app = angular.module("myApp");

app.controller('browseController', ['$scope', '$http', '$rootScope', '$window', '$location', 'sharedProperties',
    function($scope, $http, $rootScope, $window, $location, sharedProperties) {
    self = this;
    $scope.noBrowse = false;
    $scope.selectedCategoriesList = [];

    $scope.mapView = function () {
        var mymap = L.map('mapid').setView([41.900138, 12.497103], 10);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);

        //ART
        let pointBorgheseGallery = L.marker([41.914185, 12.492196]);
        let pointPiazzaNavona = L.marker([41.899306, 12.473062]);
        let pointSantAngelo = L.marker([41.903057, 12.466351]);

        //CULTURE
        let pointColosseum = L.marker([41.890204, 12.492353]);
        let pointVaticanCity = L.marker([41.902253, 12.457108]);
        let pointBasilica = L.marker([41.902106, 12.453290]);
        let pointTreviFountain = L.marker([41.901010, 12.483276]);
        let pointPantheon = L.marker([41.898597, 12.476824]);
        let pointSpanishSteps = L.marker([41.905992, 12.482743]);

        //FOOD
        let pointTonnarello = L.marker([41.889830, 12.469337]);
        let pointLostFoodFactory = L.marker([41.900274, 12.476692]);
        let pointVitalityFood = L.marker([41.904224, 12.503090]);

        //MUSEUMS
        let pointCapitolineMuseum = L.marker([41.892931, 12.482558]);
        let pointRomanForum = L.marker([41.892456, 12.485342]);
        let pointSistineChapel = L.marker([41.902938, 12.454483]);
        let pointBathsOfDiocletian = L.marker([41.903633, 12.499947]);

        //NATURE
        let pointParcoSavello = L.marker([41.885832, 12.481205]);
        let pointVoloAltoNaturePark = L.marker([41.950222, 12.323770]);
        let pointParcoDellaCaffarella = L.marker([41.866648, 12.522467]);
        let pointVillaBorghese = L.marker([41.912596, 12.482472]);
        let pointAppiaAntica = L.marker([41.819396, 12.557307]);
        let pointLakeCentralPark = L.marker([41.830276, 12.461508]);

        //SPORT
        let pointStadioOlimpico = L.marker([41.933947, 12.454770]);
        let pointPiscinaDelleRose = L.marker([41.830954, 12.462505]);



        //ART
        pointBorgheseGallery.bindPopup("Borghese Gallery").addTo(mymap);
        pointPiazzaNavona.bindPopup("Piazza Navona").addTo(mymap);
        pointSantAngelo.bindPopup("Sant Angelo").addTo(mymap);

        //CULTURE
        pointColosseum.bindPopup("Colosseum").addTo(mymap);
        pointVaticanCity.bindPopup("Vatican City").addTo(mymap);
        pointBasilica.bindPopup("St. Peter's Basilica").addTo(mymap);
        pointTreviFountain.bindPopup("Trevi Fountain").addTo(mymap);
        pointPantheon.bindPopup("Pantheon").addTo(mymap);
        pointSpanishSteps.bindPopup("Spanish Steps").addTo(mymap);

        //FOOD
        pointTonnarello.bindPopup("Tonnarello").addTo(mymap);
        pointLostFoodFactory.bindPopup("Lost Food Factory").addTo(mymap);
        pointVitalityFood.bindPopup("VitalityFood").addTo(mymap);

        //MUSEUMS
        pointCapitolineMuseum.bindPopup("Capitoline Museum").addTo(mymap);
        pointRomanForum.bindPopup("Roman Forum").addTo(mymap);
        pointSistineChapel.bindPopup("Sistine Chapel").addTo(mymap);
        pointBathsOfDiocletian.bindPopup("Baths Of Diocletian").addTo(mymap);

        //NATURE
        pointParcoSavello.bindPopup("Parco Savello").addTo(mymap);
        pointVoloAltoNaturePark.bindPopup("Volo Alto Nature Park").addTo(mymap);
        pointParcoDellaCaffarella.bindPopup("Parco Della Caffarella").addTo(mymap);
        pointVillaBorghese.bindPopup("Villa Borghese").addTo(mymap);
        pointAppiaAntica.bindPopup("Appia Antica").addTo(mymap);
        pointLakeCentralPark.bindPopup("Lake Central Park").addTo(mymap);

        //SPORT
        pointStadioOlimpico.bindPopup("Stadio Olimpico").addTo(mymap);
        pointPiscinaDelleRose.bindPopup("Piscina Delle Rose").addTo(mymap);

    };


    $scope.openPOI = function (id) {
        $rootScope.pointID = id;
    };

    $scope.searchPoints = function () {
        // console.log("Searching for: " + $scope.searchInput);
        // [{"ID":1,"Name":"Colosseum","Description":"The Colosseum and the Arch of Constantine",
        // "Image":"/Colosseum.jpg","CategoryID":4,"Viewers":30,"Rankers":20,"AverageRank":4.2}]
        if ($scope.searchInput == null || $scope.searchInput === "") {
            $scope.noBrowse = false;
            $scope.getAllPOIList();
        } else {
            $http({
                method: "GET",
                url: 'http://localhost:3000/getPOIListByName/' + $scope.searchInput,
                headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Headers": "Origin, X-Requested-With,Content-Type, Accept"}
            }).then(function mySuccess(response) {
                console.log("SUCCESS!");
                $scope.results = response.data;
                if (response.data.length === 0) {
                    $scope.noBrowse = true;
                } else {
                    $scope.noBrowse = false;
                }
                $scope.searchResultsPoints = response.data;
                $scope.searchResultsCategories = [];
                $scope.searchResultsCategories = [...new Set($scope.searchResultsPoints.map(x => x.CategoryID))];
                $scope.searchResultsCategoriesNames = [];
                for (let i = 0; i < $scope.searchResultsCategories.length; i++) {
                    $scope.addCategoryName(i, $scope.searchResultsCategories[i]);
                }
            }, function myError(response) {
                // debugger;
                console.log(response);
                console.log(response.data);
                console.log("FAILURE!");
                $scope.myWelcome = response.statusText;
            });
        }
    };

    $scope.addCategoryName = function (i, id) {
        $http({
            method: "GET",
            url: 'http://localhost:3000/getCategoryNameByCategoryID/' + id,
            headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Headers": "Origin, X-Requested-With,Content-Type, Accept"}
        }).then(function mySuccess(response) {
            let catData = response.data[0];
            $scope.searchResultsCategoriesNames.push({ID: id, Name: catData.Name});
            $scope.selectedCategoriesList.push({ID: id, Name: catData.Name});
        }, function myError(response) {
            // debugger;
            console.log(response);
            console.log(response.data);
            console.log("FAILURE!");
            $scope.myWelcome = response.statusText;
        });
    };

    $scope.getAllPOIList = function () {
        $http({
            method: "GET",
            url: 'http://localhost:3000/getAllPOI',
            headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Headers": "Origin, X-Requested-With,Content-Type, Accept"}
        }).then(function mySuccess(response) {
            console.log("SUCCESS!");
            $scope.results = response.data;
            $scope.searchResultsPoints = response.data;
            $scope.searchResultsCategories = [];
            $scope.searchResultsCategories = [...new Set($scope.searchResultsPoints.map(x => x.CategoryID))];
            $scope.searchResultsCategoriesNames = [];
            for (let i = 0; i < $scope.searchResultsCategories.length; i++) {
                $scope.addCategoryName(i, $scope.searchResultsCategories[i]);
            }
        }, function myError(response) {
            // debugger;
            console.log(response);
            console.log(response.data);
            console.log("FAILURE!");
            $scope.myWelcome = response.statusText;
        });
    };

    $scope.changeCategories = function(category) {
        for (let i = 0; i < $scope.selectedCategoriesList.length; i++) {
            if ($scope.selectedCategoriesList[i].ID === category.ID) {
                $scope.selectedCategoriesList.splice(i, 1);
                return;
            }
        }
        $scope.selectedCategoriesList.push(category);
    };

    $scope.filterSelectedCategories = function (item) {
        for (let i = 0; i < $scope.selectedCategoriesList.length; i++) {
            if ($scope.selectedCategoriesList[i].ID === item.ID) {
                return true;
            }
        }
        return false;
    };

    $scope.filterSelectedCategoriesForRanks = function (item) {
        for (let i = 0; i < $scope.selectedCategoriesList.length; i++) {
            if ($scope.selectedCategoriesList[i].ID === item.CategoryID) {
                return true;
            }
        }
        return false;
    };

    $scope.openImage = function () {
        $http({
            method: "GET",
            url: 'http://localhost:3000/getPOIInfo/' + $rootScope.pointID,
            headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Headers": "Origin, X-Requested-With,Content-Type, Accept"}
        }).then(function mySuccess(response) {
            console.log("SUCCESS!");
            let pointData = response.data[0];
            $scope.pointName = pointData["Name"];
            $scope.pointImage = "images" + pointData["Image"];
            $scope.pointDescription = pointData["Description"];
            $scope.pointRankers = pointData["Rankers"];
            $scope.pointAverageRank = pointData["AverageRank"];
            $scope.pointViewers = pointData["Viewers"];
        }, function myError(response) {
            // debugger;
            console.log(response);
            console.log(response.data);
            console.log("FAILURE!");
            $scope.myWelcome = response.statusText;
        });

        $http({
            method: "GET",
            url: 'http://localhost:3000/getPOI2RecentReviews/' + $rootScope.pointID,
            headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Headers": "Origin, X-Requested-With,Content-Type, Accept"}
        }).then(function mySuccess(response) {
            console.log("SUCCESS!");
            let pointReview1Data, pointReview2Data;
            $scope.review1Exists = false;
            $scope.review2Exists = false;
            $scope.noReviews = false;
            if (response.data[0] != null) {
                $scope.review1Exists = true;
                pointReview1Data = response.data[0];
                $scope.pointReview1Rank = pointReview1Data["Rank"];
                $scope.pointReview1Text = pointReview1Data["Text"];
                $scope.pointReview1Date = pointReview1Data["Date"].split("T")[0];
                if (response.data[1] != null) {
                    $scope.review2Exists = true;
                    pointReview2Data = response.data[1];
                    $scope.pointReview2Rank = pointReview2Data["Rank"];
                    $scope.pointReview2Text = pointReview2Data["Text"];
                    $scope.pointReview2Date = pointReview2Data["Date"].split("T")[0];
                }
            } else {
                $scope.noReviews = true;
            }
        }, function myError(response) {
            // debugger;
            console.log(response);
            console.log(response.data);
            console.log("FAILURE!");
            $scope.myWelcome = response.statusText;
        });
    };

    $scope.changeFavorites = function(pointID) {
        let wasFavorite = false;
        let tmp = $window.sessionStorage.getItem('userFavPOIList');
        let oldFavPOIList;
        if (tmp.length === 0) {
            oldFavPOIList = [];
        } else {
            oldFavPOIList = tmp.split(",");
        }
        let newFavPOIList = [];
        for (let i = 0; i < oldFavPOIList.length; i++) {
            let tmpPOI = parseInt(oldFavPOIList[i]);
            if (tmpPOI === pointID) {
                wasFavorite = true;
            } else {
                newFavPOIList.push(tmpPOI);
            }
            newFavPOIList = newFavPOIList.filter(function (value) {
                return !Number.isNaN(value);
            });
        }
        if (!wasFavorite) {
            newFavPOIList.push(pointID);
        }
        newFavPOIList = newFavPOIList.filter(function (value) {
            return !Number.isNaN(value);
        });
        console.log(newFavPOIList);
        $window.sessionStorage.setItem('userFavPOIList', newFavPOIList.toString());
    };

    $scope.initCB = function(id) {
        if (!$rootScope.existsConnectedUser) {
            return false;
        }
        let tmp = $window.sessionStorage.getItem('userFavPOIList');
        let initFavPOIList = tmp.split(",");
        for (let i = 0; i < initFavPOIList.length; i++) {
            let tmpPOI = parseInt(initFavPOIList[i]);
            if (tmpPOI === id) {
                return true;
            }
        }
        return false;
    };

    $scope.searchPoints();

}]);
