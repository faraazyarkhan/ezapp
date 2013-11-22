// Collection.js
// -------------
define(["jquery","backbone","models/EmployerModel", "helpers/Util", "helpers/Constants"],

  function ($, Backbone, EmployerModel, Util, Constants) {

        
    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
        
        model: EmployerModel,
        
    });

    // Returns the Model class
    return Collection;

  }

);