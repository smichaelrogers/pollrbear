PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
    this.renderUserView();
  },

  render: function() {
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);

    return this;
  },

  renderUserView: function() {
    var view = new PollrBear.Views.UserShow({
      model: PollrBear.currentUser
    });
    $('#idx').html(view.render().$el);
  }

});
