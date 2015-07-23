PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],
  tagName: 'section',
  className: 'container',

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.render();
  },

  render: function() {
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);

    var view = new PollrBear.Views.UserShow({
      model: PollrBear.currentUser,
      collection: this.collection
    });
    this.$('#idx').html(view.render().$el);
    return this;
  }
});
