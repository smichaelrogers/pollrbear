PollrBear.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],
  events: {
    'click .submit-question-data': 'submitQuestionData'
  },
  initialize: function(options) {
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submitQuestionData: function(event) {
    event.preventDefault();
    var that = this;
    var formData = this.$('.new-question-form').serializeJSON();
    formData.question.poll_id = this.model.id;
    var question = this.collection.create(formData);
    var view = new PollrBear.Views.AnswerForm({
      collection: PollrBear.currentUser.answers(),
      model: question
    });
  }
});
