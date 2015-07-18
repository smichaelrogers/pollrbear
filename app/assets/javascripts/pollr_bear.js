window.PollrBear = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function() {
    new PollrBear.Routers.Router;
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollrBear.initialize();
});
