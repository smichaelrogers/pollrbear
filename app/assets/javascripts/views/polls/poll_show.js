PollrBear.Views.PollShow = Backbone.DashboardView.extend({
  template: JST['polls/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    return this;
  }
});
