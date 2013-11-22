// DesktopInit.js
// --------------

// Includes Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery", "backbone", "routers/Router", "helpers/Util", "helpers/DataStorage", "helpers/Services", "jqueryui", "bootstrap","console"],

  function ($, Backbone, Router, Util, DataStorage, Services) {

      var genKey = DataStorage.generateKey();
      var cookievalue = DataStorage.get_cookie("SessionKey");
      if (cookievalue == null) {
          DataStorage.set_cookie("SessionKey", genKey, 7, window.location.hostname);
      }

      //add the initial ajax call to get the auth token
      if (gblGetToken) Services.GetAuthenticateToken();
      if (gblServiceEnabled) Services.HeartbeatPoll();

      $.fn.serializeObject = function () {
          var o = {};
          var a = this.serializeArray();
          $.each(a, function () {
              if (o[this.name] !== undefined) {
                  if (!o[this.name].push) {
                      o[this.name] = [o[this.name]];
                  }
                  o[this.name].push(this.value || '');
              } else {
                  o[this.name] = this.value || '';
              }
          });
          return o;
      };

      // Skip Navigation
      $('#skip-nav').on("click", function (e) {
          $('#content-start').focus();
      });

      $(document).ready(function () {
          // Instantiates a new Desktop Router instance
          new Router();
      });
  }

);