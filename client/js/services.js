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
      }
      // ,
      // getMediaById: function(id) {
      //   return $http.get('http://localhost:3000/api/media/' + id);
      // },
      // likeMedia: function(id) {
      //   return $http.post('http://localhost:3000/api/like', { mediaId: id });
      // }
    };
}]);

