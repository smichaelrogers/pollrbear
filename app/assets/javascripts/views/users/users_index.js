PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],

  initialize: function() {
    this.render();
  },

  render: function() {
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);
    var view = new PollrBear.Views.UserShow({
      model: PollrBear.currentUser
    });
    this.$('#idx').html(view.render().$el);
    return this;
  },

});
