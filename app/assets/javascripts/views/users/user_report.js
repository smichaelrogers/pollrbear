PollrBear.Views.UserReport = Backbone.DashboardView.extend({
  template: JST['users/show'],

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  }
});
