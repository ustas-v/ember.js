var view, ActionHelper = Ember.Handlebars.ActionHelper;

var appendView = function() {
  Ember.run(function() { view.appendTo('#qunit-fixture'); });
};

module("Ember.Handlebars - action helper", {
  setup: function() {
  },

  teardown: function() {
    // if (view) { view.destroy(); }
  }
});

test("should output a data attribute with a guid", function() {
  view = Ember.View.create({
    template: Ember.Handlebars.compile('<a href="#" {{action "edit"}}>')
  });

  appendView();

  ok(view.$('[data-ember-action]').length, "a data attribute should be added to the tag");
  ok(view.$('a').attr('data-ember-action').match(/\d+/), "should have a guid");
});

test("should by default register a click event", function() {
  var registeredEventName;

  ActionHelper.registerAction = function(actionId, eventName) {
    registeredEventName = eventName;
  };

  view = Ember.View.create({
    template: Ember.Handlebars.compile('<a href="#" {{action "edit"}}>')
  });

  appendView();

  equals(registeredEventName, 'click');
});

test("should allow alternate events to be handled", function() {
  var registeredEventName;

  ActionHelper.registerAction = function(_, eventName) {
    registeredEventName = eventName;
  };

  view = Ember.View.create({
    template: Ember.Handlebars.compile('<a href="#" {{action "edit" on="mouseUp"}}>')
  });

  appendView();

  equals(registeredEventName, 'mouseUp');
});

test("should by default target the containing view", function() {
  var registeredTarget;

  ActionHelper.registerAction = function(_, _, target) {
    registeredTarget = target;
  };

  view = Ember.View.create({
    template: Ember.Handlebars.compile('<a href="#" {{action "edit"}}>')
  });

  appendView();

  equals(registeredTarget, view);
});

test("should allow a target to be specified", function() {
  var registeredTarget;

  ActionHelper.registerAction = function(_, _, target) {
    registeredTarget = target;
  };

  var anotherTarget = Ember.View.create();

  view = Ember.View.create({
    template: Ember.Handlebars.compile('<a href="#" {{action "edit" target="anotherTarget"}}>'),
    anotherTarget: anotherTarget
  });

  appendView();

  equals(registeredTarget, anotherTarget);
});
