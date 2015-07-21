PollrBear.Views.PollShow = Backbone.DashboardView.extend({
  template: JST['polls/show'],
  events: {
    'click .show-questions': 'showQuestions'
  },
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    return this;
  },
  showQuestions: function() {
    event.preventDefault();
    var view = new PollrBear.Views.QuestionsIndex({
      model: this.model
    });
    this.addSubview('.questions', view);
  }
});
