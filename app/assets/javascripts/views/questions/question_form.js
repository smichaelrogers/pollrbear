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
    var formData = this.$('.new-question-form').serializeJSON();
    formData.question.poll_id = this.model.id;
    var question = this.collection.create(formData);
    $("#poll-form-questions").addClass("collapsed");
    $(document).ajaxComplete(function() {
      var view = new PollrBear.Views.AnswerForm({
        collection: PollrBear.currentUser.answers(),
        model: question
      });
      var preview = new PollrBear.Views.QuestionPreview({
        model: question
      });
      this.$(".question-preview").html(preview.render().$el);
      $("#poll-form-answers").html(view.render().$el);
    }.bind(this));
  }
});
