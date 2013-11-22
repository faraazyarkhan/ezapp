// Require.js Configurations
// -------------------------
require.config({

    // Sets the js folder as the base directory for all future relative paths
    baseUrl: "./js/app",

    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths: {

        // Core Libraries
        // --------------
        "jquery": "../libs/jquery",

        "jqueryui": "../libs/jqueryui",

        "underscore": "../libs/lodash",

        "backbone": "../libs/backbone",
        
        "formValidatorConfig": "../libs/FormValidatorConfig",

        "formValidator": "../libs/FormValidator",

        "store": "../libs/store",

        "modal": "../libs/modal",
        
        // Plugins
        // -------
        "validateAll": "../libs/plugins/Backbone.validateAll",

        "bootstraphelper": "../libs/plugins/bootstraphelper",

        "modalpopup": "../libs/plugins/modalpopup",

        "modelbinder": "../libs/plugins/modelbinder",

        "formValidation": "../libs/plugins/validation",

        "bootstrap": "../libs/plugins/bootstrap",

        "text": "../libs/plugins/text",

        "jasminejquery": "../libs/plugins/jasmine-jquery",

        "custominput": "../libs/plugins/custominput",
        
        "json2" : "../libs/plugins/json2",

        "blockui": "../libs/plugins/JQuery.BlockUI",

        "console": "../libs/console"
        
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {

        // jQuery Mobile
        "jquerymobile": ["jquery"],

        // Twitter Bootstrap jQuery plugins
        "bootstrap": ["jquery"],

        // jQueryUI
        "jqueryui": ["jquery"],

        // Backbone
        "backbone": {
            // Depends on underscore/lodash and jQuery
            "deps": ["underscore", "jquery"],
            // Exports the global window.Backbone object
            "exports": "Backbone"
        },

        // Backbone.validateAll plugin that depends on Backbone
        "validateAll": {
            "deps": ["jquery", "underscore", "backbone"],
            "exports": "validateAll"
        },

        "bootstraphelper": {
            "deps": ["jquery", "backbone", "formValidation"],
            "exports": "bootstraphelper"
        },

        "modalpopup": ["jquery", "underscore"],

        "modelbinder": {
            "deps": ["jquery", "underscore", "backbone"],
            "exports": "modelbinder"
        },

        "formValidation": {
            "deps": ["jquery", "underscore", "backbone","validateAll"],
            "exports": "formValidation"
        },

        // Jasmine-jQuery plugin
        "jasminejquery": ["jquery"],
        
        // json2
        "json2": {
            "exports": "json2"
        },
        
        // store
        "store": {
            // Depends on json2 for older browsers
            "deps": ["json2"],
            // Exports store
            "exports": "store"
        },

        // Modal popup
        "modal": {
            // Depends on json2 for older browsers
            "deps": ["jquery"],
            // Exports store
            "exports": "modal"
        },
        // Jasmine-jQuery plugin
        "custominput": {
            // Depends on underscore/lodash and jQuery
            "deps": ["jquery"],

            // Exports the global window.Backbone object
            "exports": "custominput"
        },

        "formValidatorConfig": {
            "deps": ["jquery"],
            "exports": "formValidatorConfig"
        },

        "formValidator": {
            "deps": ["jquery"],
            "exports": "formValidator"
        },

        "blockui": {
            "deps": ["jquery", "jqueryui"],
            "exports": "blockui"
        }


    }

});


