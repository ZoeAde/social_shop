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
      getFeed: function() {
        return $http.get('http://localhost:5000/api/feed');


            // var endPoint = 'https://api.instagram.com/v1/users/2284359629/media/recent/?client_id=311624c2f9f9454a9c7c053b234cc12a';

            // $http.jsonp(endPoint).success(function(response){
            //     callback(response.data);
            // });
    }
  }
}]);

