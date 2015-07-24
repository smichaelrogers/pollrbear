PollrBear.Views.PollReport = Backbone.DashboardView.extend({
  template: JST['polls/show'],

  initialize: function() {
    this.collection = this.model.questions();
  },
  render: function() {
    var content = this.template({
      questions: this.collection,
      poll: this.model
    });
    this.$el.html(content);
    return this;
  }
});
