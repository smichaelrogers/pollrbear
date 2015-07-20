PollrBear.Views.UsersShow = Backbone.DashboardView.extend({
  template: JST['users/show'],
  initialize: function(options) {
    this.listenTo(this.model, "sync change", this.render);
  },
  render: function() {
    var html = this.template({
      user: this.model
    });
    this.$el.html(html);

    return this;
  }

});
