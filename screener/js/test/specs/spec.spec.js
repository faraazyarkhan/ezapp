// Jasmine Unit Testing Suite
// --------------------------
define(["jquery", "backbone", "views/View","models/Model", "collections/Collection", "routers/Router", "jasminejquery"],

    function($, Backbone, View, Model, Collection, Router) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("Backbone-Require-Boilerplate (BRB)", function() {

            // Backbone View Suite: contains all tests related to views
            describe("Backbone views", function() {

                // Runs before every View spec
                beforeEach(function() {

                    // Instantiates a new View instance
                    this.view = new View();

                });

                it("should contain the correct view element", function() {

                    this.router = new Router();

                    expect(this.view.$el.selector).toEqual(".main-body-content");

                });

                it("should contain the appropriate template", function() {

                    //expect(this.view.template).toEqual(headerText);

                });

            }); // End of the View test suite

            // Backbone Model Suite: contains all tests related to models
            describe("Backbone models", function() {

                // Runs before every Model spec
                beforeEach(function() {

                    // Instantiates a new Model instance
                    this.model = new Model();

                    // We are spying on the _validate method to see if it gets called
                    spyOn(Model.prototype, "validate").andCallThrough();

                });

                it("should be in a valid state", function() {

                    expect(this.model.isValid()).toBe(true);

                });

                it("should call the validate method when setting a property", function() {

                    this.model.set({ example: "test" }, { validate: true });

                    expect(Model.prototype.validate).toHaveBeenCalled();

                });

            }); // End of the Model test suite

        // Backbone Collection Suite: contains all tests related to collections
        describe("Backbone collections", function() {

            // Runs before every Collection spec
            beforeEach(function() {

                // Instantiates a new Collection instance
                this.collection = new Collection();

            });

            it("should contain the correct number of models", function() {

                expect(this.collection.length).toEqual(0);

            });

        }); // End of the Collection test suite

        // Backbone Router Suite: contains all tests related to routers
        describe("Backbone desktop routers", function () {

            // Runs before every Router spec
            beforeEach(function () {

                // Stops the router from listening to hashchange events (Required because Backbone will only allow you to run Backbone.history.start() once for each page load.)
                Backbone.history.stop();

                // Instantiates a new Router instance
                this.router = new Router();

                // Creates a Jasmine spy
                this.routeSpy = jasmine.createSpy("home");

                // When the route index method is called, the Jasmine spy is also called
                this.router.on("route:index", this.routeSpy);

            });

            it("should call the desktop router home method when there is no hash on the url", function() {

                // Navigates to a different route
                this.router.navigate("elsewhere");

                // Navigates to the default route
                this.router.navigate("", { trigger: true });

                // Expects the Jasmine spy to have been called
                expect(this.routeSpy).toHaveBeenCalled();

            });

        }); // End of the Router test suite

        
    }); // End of the BRB test suite

});