// Collection.js
// -------------
define(["jquery","backbone","models/Model", "helpers/Helper", "helpers/Util", "helpers/Constants"],

  function($, Backbone, Model, Helper, Util, Constants) {

        
    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
        
        url: function() {
            return Helper.getDataURL();
        },
        
        // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
        model: Model,
        
        parse: function(response){
            return response;
        }       
    
    });

    // Returns the Model class
    return Collection;

  }

);