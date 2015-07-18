window.PollrBear = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollrBear.initialize();
});
