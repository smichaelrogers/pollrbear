PollrBear.Views.QuestionForm = Backbone.DashboardView.extend({
  template: JST['questions/form'],
  events: {
    'click .submit-question-data': 'submitQuestionData'
  },

  initialize: function(options) {
    this.render();
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submitQuestionData: function(event) {
    event.preventDefault();
    var formData = this.$('.new-question-form').serializeJSON();
    formData.question.poll_id = this.model.id;
    var view = new PollrBear.Views.AnswerForm({
      collection: PollrBear.currentUser.answers(),
      model: this.collection.create(formData)
    });
    this._swapView(view);
  }
});
