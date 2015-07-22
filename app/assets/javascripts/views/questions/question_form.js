PollrBear.Views.QuestionForm = Backbone.DashboardView.extend({
  template: JST['questions/form'],
  events: {
    'click .submit-answer-data': 'submitAnswerData'
  },

  initialize: function(options) {},
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submitAnswerData: function(event) {
    event.preventDefault();
    var formData = this.$('.new-question-form').serializeJSON();
    formData.poll_id = this.model.id;
    var question = this.collection.create(formData);

    var view = new PollrBear.views.AnswerForm({
      collection: PollrBear.currentUser.answers(),
      model: question
    });
  }
});
