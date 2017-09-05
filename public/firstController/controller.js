app.controller('mainController', ['$scope','$http', function ($scope,$http) {
  $scope.Name='a';
    $scope.cities=[];
    this.click=function(){
      $http.get("http://localhost:3000/tasks/s").then(function (response) {

            $scope.cities = response.data;
            console.log(response.data);

        });
    }
}]);