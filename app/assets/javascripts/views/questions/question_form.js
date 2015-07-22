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
    var that = this;
    var formData = this.$('.new-question-form').serializeJSON();
    formData.question.poll_id = this.model.id;
    var question = this.collection.create(formData);
    window.setTimeout(function () {
      var view = new PollrBear.Views.AnswerForm({
        collection: PollrBear.currentUser.answers(),
        model: question
      });
      that._swapView(view);
    }.bind(this), 200);
  }
});
