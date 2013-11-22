var tests = [];
for (var file in window.__karma__.files) {
    if (/.spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app',

    paths: {
		'jquery': '../libs/jquery',
		
		'underscore': '../libs/underscore',
		
		'jqueryui': '../libs/jqueryui',

		'jquerymobile': '../libs/jquery.mobile',

		'underscore': '../libs/lodash',

		'backbone': '../libs/backbone',
		
		"datatable": "../libs/jquery.dataTables",

		// Plugins
		// -------
		'backbone.validateAll': '../libs/plugins/Backbone.validateAll',

		'bootstrap': '../libs/plugins/bootstrap',

		'text': '../libs/plugins/text',

		'jasminejquery': '../libs/plugins/jasmine-jquery'
    },

    shim: {
        'underscore': {
			exports: '_'
		},
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
		"backbone.validateAll": ["backbone"],

		// Jasmine-jQuery plugin
		"jasminejquery": ["jquery"],
        
        // Data Table
        "datatable": {
            // Depends on underscore/lodash and jQuery
            "deps": ["jquery"],

            // Exports the global window.Backbone object
            "exports": "DataTable"
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

