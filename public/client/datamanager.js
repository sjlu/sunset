client.service('DataManager', ['$rootScope', '$http', '$location', function($rootScope, $http, $location) {

  var DataManager = (function() {

    // The below
    var cache = {};
    var observers = {};
    var requests = {};

    function DataManager() {
      _.each(window.DataManagerSeed, function(preload, set) {
        cache[set] = preload;
      });
    };

    var notify = function(set) {
      if (!observers[set]) return;
      angular.forEach(observers[set], function(cb) {
        cb(cache[set]);
      });
    }

    var updateAndNotify = DataManager.prototype.updateAndNotify = function(set, data) {
      cache[set] = data;
      notify(set);
    };

    var observe = DataManager.prototype.observe = function(set, cb) {
      if (!observers[set]) {
        observers[set] = [];
      }

      observers[set].push(cb);

      if (!cache[set]) {
        if (methods[set] && methods[set].get) {
          methods[set].get();
        }

        if (methods[set] && methods[set].defaults) {
          cache[set] = methods[set].defaults;
        } else {
          cache[set] = {};
        }
      }

      cb(cache[set]);
      return cache[set];
    }


    var request = DataManager.prototype.request = function(method, url, data, cb) {
      data = data || {}
      cb = cb || function() {};

      // only allow one GET request at a time.
      if (method === "GET") {
        if (requests[url]) {
          return cb();
        }

        requests[url] = true;
      }

      $http({
        method: method,
        url: url,
        data: data
      }).success(function(data) {
        cb(null, data);

        if (method === 'GET') {
          delete requests[url];
        }
      }).error(function(data, status, headers, config) {
        // for some reason if the user runs into a
        // 401 we want to redirect them back to the
        // login
        console.error("Request failed!", method, url, status, data);
        if (status === 401) {
          var url = $location.url();
          window.location = '/login?next=' + encodeURIComponent(url);
        }

        cb(data);
      });
    };

    _.each(["get", "post", "put", "delete"], function(method) {
      DataManager.prototype[method] = function(url, data, cb) {
        if(typeof data === 'function'){
          cb = data;
          data = {};
        }
        request(method, url, data, cb);
      }
    });

    var endpoints = {};
    var methods = DataManager.prototype.methods = {};
    _.each(endpoints, function(value, key) {
      methods[key] = {
        defaults: value.defaults,
        get: function(cb) {
          cb = cb || function(){};
          request("GET", value.url, {}, function(err, data) {
            updateAndNotify(key, data);
            cb(err, data);
          });
        },
        create: function(data, cb) {
          cb = cb || function(){};
          request("POST", value.url, data, function(err, data) {
            updateAndNotify(key, data);
            cb(err, data);
          });
        }
      };
    });

    return DataManager;

  })();

  return new DataManager();

}]);