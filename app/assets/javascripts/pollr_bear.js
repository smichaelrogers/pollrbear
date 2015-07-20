window.PollrBear = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new PollrBear.Models.CurrentUser();
    this.currentUser.fetch();
    this.header = new PollrBear.Views.Header({ el: "#header" });
    this.router = new PollrBear.Routers.Users({ $rootEl: $("#content") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollrBear.initialize();
});
