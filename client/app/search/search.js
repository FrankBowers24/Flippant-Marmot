angular.module('socialStock.search', [])

.controller('SearchController', function ($scope, $location, clientFactory) {
  $scope.search = function(term){
    clientFactory.getTwitterInfo(term).then(function(data){
      $scope.stocks = [data.data];
      console.log($scope.stocks);
      $scope.searchTerm = '';
    });
  };
  $scope.buyStock = function(shares){
    var date = new Date();
    var purchase = {
      "screen_name": "@" + $scope.stocks[0].screen_name,
      "name": $scope.stocks[0].name,
      "follower_count_at_purchase": $scope.stocks[0].follower_count_at_query_time,
      "price_at_purchase": $scope.stocks[0].price_at_purchase,
      "date_of_purchase": date.toString(),
      "shares": +shares
    };
    clientFactory.buyStock(purchase).then(function(data){
    });
    $scope.shares = '';
  }
});
