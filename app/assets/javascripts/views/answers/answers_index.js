PollrBear.Views.AnswersIndex = Backbone.View.extend({
  template: JST['answers/index'],
  events: {
    "click .show-answer": "renderAnswer"
  },
  initialize: function() {
    this.trigger('add');
  },
  render: function() {
    var content = this.template({
      answers: this.collection
    });
    this.$el.html(content);
    return this;
  }
});
