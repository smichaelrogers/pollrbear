PollrBear.Views.QuestionsIndex = Backbone.DashboardView.extend({
  template: JST['questions/index'],
  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    return this;
  },
  showQuestions: function(event) {
    event.preventDefault();
    var questionId = $(event.currentTarget).attr('data-id');
    var question = this.collection.getOrFetch(questionId);

    var view = new PollrBear.Views.QuestionShow({
      model: question
    });

    this.$('.show-poll').html(view.render().$el);
  }
});
