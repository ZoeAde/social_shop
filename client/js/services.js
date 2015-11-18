app.factory('myFactory', ['$http', function($http){
  var obj = {};

  //get request
  obj.get = function(url){
    return $http.get(url);
  };

  //post request
  obj.post = function(url, payload){
    return $http.post(url, payload);
  };

  //put request
  obj.put = function(url, payload){
    return $http.put(url, payload);
  };

  //delete request
  obj.delete = function(url){
    return $http.delete(url);
  };

  return obj;
}]);

app.factory('instagram', ['$http', function($http){

  return {
    fetchPopular: function(callback){

            var endPoint = "https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

            $http.jsonp(endPoint).success(function(response){
                callback(response.data);
            });
    }
  }

}]);

