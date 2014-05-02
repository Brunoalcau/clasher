'use strict';
angular.module('angularfire.login', ['firebase', 'angularfire.firebase'])

  .run(function(simpleLogin) {
    simpleLogin.init();
  })

  .factory('simpleLogin', function($rootScope, $firebaseSimpleLogin, firebaseRef, $timeout) {
    function assertAuth() {
      if( auth === null ) { throw new Error('Must call loginService.init() before using its methods'); }
    }

    var auth = null;
    return {
      init: function() {
        auth = $firebaseSimpleLogin(firebaseRef());
        return auth;
      },

      logout: function() {
        assertAuth();
        // delete $rootScope.profile.user;
        auth.$logout();
      },

      /**
       * @param {string} provider
       * @param {Function} [callback]
       * @returns {*}
       */
      login: function(provider, callback) {
        assertAuth();
        auth.$login(provider, {rememberMe: true, preferRedirect: true}).then(function(user) {

          // console.log(user);

          if( callback ) {
            //todo-bug https://github.com/firebase/angularFire/issues/199
            $timeout(function() {
              callback(null, user);
            });
          }
        }, callback);
      },
      login2: function(provider) {
        assertAuth();
        return auth.$login(provider, {rememberMe: true, preferRedirect: true});
        // .then(function(user) {

        //   console.log(user);

        //   if( callback ) {
        //     //todo-bug https://github.com/firebase/angularFire/issues/199
        //     $timeout(function() {
        //       callback(null, user);
        //     });
        //   }
        // }, callback);
      }


    };
  });
