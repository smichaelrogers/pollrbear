PollrBear.Views.QuestionsIndex = Backbone.DashboardView.extend({

  template: JST['questions/index'],
  events: {
    'click .show-question': 'showQuestion'
  },
  //====================================================================

  initialize: function() {
    this.collection = this.model.questions();
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    return this;
  },
  //====================================================================

  showQuestion: function(event) {
    event.preventDefault();
    var questionId = $(event.currentTarget).attr('data-id');
    var question = this.collection.getOrFetch(questionId);
    var view = new PollrBear.Views.QuestionShow({
      model: question
    });
    this.addSubview('.question', view);
  }

});
