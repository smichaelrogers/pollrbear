PollrBear.Views.AnswersIndex = Backbone.View.extend({
  template: JST['answers/index'],
  events: {
    "click .show-answer": "renderAnswer"
  },
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      answers: this.collection
    });
    this.$el.html(content);
    return this;
  },
  renderAnswer: function(event) {
    event.preventDefault();
    var answerId = $(event.currentTarget).attr("data-answer-id");
    var answer = this.collection.getOrFetch(answerId);
    var view = new PollrBear.Views.AnswerShow({
      model: answer
    });
    $(event.currentTarget).find(".answer-content").html(view.render().$el);
  }
});
