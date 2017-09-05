/**
 * Created by Hasidi on 18/06/2017.
 */

let app = angular.module('myApp', ['ngRoute']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "firstController/view.html",
            controller : "mainController"
        })
        .when("/tasks", {
            templateUrl : "secondController/viewS.html",
            controller : "mainControllerS"
        })

}]);
//-------------------------------------------------------------------------------------------------------------------
