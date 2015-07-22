PollrBear.Views.QuestionForm = Backbone.DashboardView.extend({
  template: JST['questions/form'],
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click .new-question-form': 'newQuestionForm',
    'click .submit-poll-data': 'submitPollData'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.render();
  },
  render: function() {
    var content = this.template({
      collection: this.collection
    });
    this.$el.html(content);
    return this;
  },
  addAnswer: function(event) {
    var answer = this.$('.answer-input').val();
    this.$('.answer-input').val('');
    this.$('.new-answers').append("<option>" + answer + "</option>");
  },
  removeAnswers: function(event) {
    this.$("select option:selected").each(function() {
      this.remove();
    });
  },
  newQuestionForm: function(event) {
    event.preventDefault();
    var answers = this.model.answers();
    var that = this;
    var questionData = this.$('.new-question-form').serializeJSON();
    questionData['poll_id'] = this.model.poll_id;
    var answerData = this.$('.new-answers-form').serializeJSON();
    answerData['question_id'] = this.model.id;
    var question = this.collection.create(questionData, {
      success: function() {
        answerData['answers'].forEach(function(data) {
          answers.create(data)
        });
      }
    });
  },
  submitQuestionData: function(event) {
    event.preventDefault();
    var that = this;
    var questions = this.model.questions();
    var poll = this.model;
    var formData = this.$('.new-question-form').serializeJSON();
    formData["poll_id"] = this.model.id;
    this.collection.create(formData, {
      success: function() {
        var view = new PollrBear.Views.QuestionForm({
          collection: questions,
          model: poll
        }, {
          success: function() {
            that.swapView(view)
          }
        });
      }
    });
  }
});
