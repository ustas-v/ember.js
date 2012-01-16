require('ember-handlebars/ext');

var EmberHandlebars = Ember.Handlebars, helpers = EmberHandlebars.helpers, getPath = Ember.getPath;

var ActionHelper = EmberHandlebars.ActionHelper = {};
EmberHandlebars.ActionHelper.registerAction = function(actionName, eventName, target) {
  var actionId = ++jQuery.uuid;

  function handler(event) {
    target[actionName](event);
  };

  // FIXME: Use App's rootElement
  $(document.body).delegate('[data-ember-action=' + actionId + ']', eventName, handler);

  return actionId;
};

EmberHandlebars.registerHelper('action', function(actionName, options) {
  var hash = options.hash || {},
      eventName = options.hash.on || "click",
      // Do we need to worry about the specified target changing?
      target = options.hash.target ? getPath(this, options.hash.target) : this;

  var actionId = ActionHelper.registerAction(actionName, eventName, target);

  return new EmberHandlebars.SafeString('data-ember-action="' + actionId + '"');
});
