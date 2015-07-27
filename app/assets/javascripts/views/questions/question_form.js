PollrBear.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],
  events: {
    'click .submit-question-data': 'submitQuestionData'
  },
  initialize: function(options) {
    this.pollFormData = options.pollFormData;
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submitQuestionData: function(event) {
    event.preventDefault();
    var questionFormData = this.$('.new-question-form').serializeJSON();
    $("#poll-form-questions").addClass("collapsed");
    var view = new PollrBear.Views.AnswerForm({
      pollFormData: this.pollFormData,
      questionFormData: questionFormData
    });
    $("#poll-form-answers").html(view.render().$el);
  }
});
