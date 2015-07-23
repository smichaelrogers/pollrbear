PollrBear.Views.AnswerForm = Backbone.DashboardView.extend({
  template: JST['answers/form'],
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click .submit-answer-data': 'submitAnswerData',
    'click .submit-answer-new-question': 'submitAnswerNewQuestion',
    'keydown input': 'maybeCreate'
  },

  initialize: function(options) {
    this.render();
    this.listenTo(this.model, 'sync', this.render());
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
    this.render();
  },
  submitAnswerData: function(event) {
    event.preventDefault();
    var that = this;
    var answers = this.collection;
    var question_id = this.model.id;
    this.$('option').each(function(index, value) {
      var str = value.value;
      answers.create({
        text: str,
        question_id: question_id
      });
      window.setTimeout(function() {}, 20);
    });
    var view = new PollrBear.Views.PollForm({
      model: PollrBear.currentUser
    });
    this._swapView(view);
  },

  maybeCreate: function(event) {
    if (event.keyCode === 13) {
      this.addAnswer();
    }
  }
});
