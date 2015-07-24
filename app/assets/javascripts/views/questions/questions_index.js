PollrBear.Views.QuestionsIndex = Backbone.DashboardView.extend({
  template: JST['questions/index'],
  events: {
    'click a.show-result': 'showResult'
  },
  initialize: function() {
    this.collection.fetch();
  },
  render: function() {
    var content = this.template({
      questions: this.collection,
      pollId: this.collection.poll.id
    });
    this.$el.html(content);
    return this;
  },
  showResult: function(event) {
    event.preventDefault();
    var questionId = $(event.currentTarget).attr('data-question-id');
    var question = this.collection.getOrFetch(questionId);
    var $target = this.$("div[data-question-id=\"" + questionId + "\"]");
    var view = new PollrBear.Views.QuestionShow({
      model: question
    });
    $(".result-content").html('');
    $target.html(view.render().$el);

  }

});
