PollrBear.Views.QuestionForm = Backbone.DashboardView.extend({
  template: JST['questions/form'],
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click .new-question-form': 'newQuestionForm',
    'click .submit-poll-data': 'submitPollData'
  },

  initialize: function() {
    this.collection = this.model.questions();
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

    var questionData = this.$('.question-form').serializeJSON();
    questionData['poll_id'] = this.model.id;
    debugger
    var question = this.collection.create(questionData, {
      success: function(data) {
        var question_id = data.id;
        that.$('option').each(function(index) {
          PollrBear.currentUser.answers().create({
            question_id: question_id,
            text: this.val()
          })
        })
      }
    });
  },
  submitQuestionData: function(event) {
    event.preventDefault();
    var that = this;
    var questions = this.model.questions();
    var poll = this.model;
    var formData = this.$('.question-form').serializeJSON();
    formData["poll_id"] = this.model.id;
    this.collection.create(formData, {
      success: function() {
        var view = new PollrBear.Views.QuestionForm({
          collection: questions,
          model: poll
        }, {
          success: function() {
            that._swapView(view)
          }
        });
      }
    });
  }
});
