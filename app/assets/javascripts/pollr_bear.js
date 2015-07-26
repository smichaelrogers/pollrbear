window.PollrBear = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('initialize');
    this.currentUser = new PollrBear.Models.CurrentUser();
    this.currentUser.fetch();
    this.nav = new PollrBear.Views.Nav({ el: $("#nav") });
    this.router = new PollrBear.Routers.Users({ $rootEl: $("#root") });
    Backbone.history.start();
  }
};
