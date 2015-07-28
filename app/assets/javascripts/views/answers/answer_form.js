PollrBear.Views.AnswerForm = Backbone.View.extend({
  template: JST['answers/form'],
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click .submit-answer-data': 'submitAnswerData',
    'click .submit-answer-new-question': 'submitAnswerNewQuestion',
    'keydown input': 'maybeCreate'
  },
  initialize: function(options) {
    this.pollFormData = options.pollFormData;
    this.questionFormData = options.questionFormData;
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  addAnswer: function(event) {
    var answer = this.$('.answer-input').val();
    this.$('.answer-input').val('');
    this.$('.new-answers').append("<option value=\"" + answer + "\">" + answer + "</option>");
  },
  removeAnswers: function(event) {
    this.$("select option:selected").each(function() {
      this.remove();
    });
  },
  submitAnswerData: function(event) {
    event.preventDefault();
    var answerFormData = [];
    this.$('option').each(function(index, value) {
      var str = value.value;
      answerFormData.push(str);
    });
    this.questionFormData.answers = answerFormData;
    this.pollFormData.questions.push(this.questionFormData);
    var fullData = this.pollFormData;
    $.ajax({
      url: "/api/polls",
      type: "POST",
      data: fullData,
      dataType: "json",
      success: function(payload) {
        $("#poll-form-questions, #poll-form-answers").html("");
        $("#poll-form-poll").removeClass("form-collapsed");
        $("#poll-form-poll input").val("");
        $("#poll-form-poll textarea").val("");
      },
      error: function(payload) {
        alert("invalid one thing or another");
      }
    });
  },
  submitAnswerNewQuestion: function(event) {
    event.preventDefault();
    var answerFormData = [];
    this.$('option').each(function(index, value) {
      var str = value.value;
      answerFormData.push(str);
    });
    this.questionFormData.answers = answerFormData;
    this.pollFormData.questions.push(this.questionFormData);
    var updatedData = this.pollFormData;
    $("#poll-form-questions, #poll-form-answers").html("");
    $("#poll-form-questions").removeClass("form-collapsed");
    var view = new PollrBear.Views.QuestionForm({
      pollFormData: updatedData
    });
    console.log(this.pollFormData);
    $("#poll-form-questions").html(view.render().$el);
  },

  maybeCreate: function(event) {
    if (event.keyCode === 13) {
      this.addAnswer();
    }
  }
});
