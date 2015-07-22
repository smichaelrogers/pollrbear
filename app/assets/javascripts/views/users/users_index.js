PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],

  initialize: function(options) {
    // this.listenTo(this.collection, "sync", this.render);
    this.render();
  },

  render: function() {
    var view = new PollrBear.Views.UserShow({
      model: PollrBear.currentUser,
      collection: this.collection
    });
    this.$el.html(view.render().$el);
    return this;
  }
});
