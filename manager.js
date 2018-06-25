var app = angular.module('main',['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider  
    .when('/insert',
    {
        controller: 'BeerController',
        templateUrl: 'beer.html'
    })
    .otherwise({ 
        templateUrl: 'default.html'
    });
});

app.controller('BeerController',function ($scope,BeerService){


    $scope.message="enter the details";
    $scope.AddBeer= function()
    {
        BeerService.AddtoDB($scope.b);
    }

})

app.factory("BeerService",['$http',function ($http){
    var fac ={};
    fac.AddtoDB = function(b)
    { 
        let config={headers:{'log' : b.userid}};
        $http.post("http://localhost:3000/beer",b, config).then(function(response){
            console.log(response);
            alert();
        });
    }
    return fac;
}])