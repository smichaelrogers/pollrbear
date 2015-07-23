PollrBear.Views.UserProfile = Backbone.DashboardView.extend({
  template: JST['users/profile'],

  initialize: function() {
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  }
});
