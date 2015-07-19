PollrBear.Views.PollReport = Backbone.DashboardView.extend({
  template: JST['polls/report'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    return this;
  },
  showQuestions: function() {

  }
});
