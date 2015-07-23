PollrBear.Views.UserInfo = Backbone.DashboardView.extend({
  template: JST['users/info'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
    this.model.fetch();
  },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  }
});
