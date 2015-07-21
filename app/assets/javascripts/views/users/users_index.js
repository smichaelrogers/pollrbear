PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],

  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    var content = this.template({
      users: this.collection
    });

    this.$el.html(content);
    this.showCurrentUserPage();
    return this;
  },

  showCurrentUserPage: function() {
    var that = this;
    var view = new PollrBear.Views.UserShow({
      model: PollrBear.currentUser
    });
    this.addSubview("#users", view);
  }
});
