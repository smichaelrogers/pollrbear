window.PollrBear = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new PollrBear.Models.CurrentUser();
    this.currentUser.fetch();
    this.dashboard = new PollrBear.Views.Dashboard({ el: "#dashboard" });
    this.router = new PollrBear.Routers.Users({ $rootEl: $("#content") });
    Backbone.history.start();
  }
};
