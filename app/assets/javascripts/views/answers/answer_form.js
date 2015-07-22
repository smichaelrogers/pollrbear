PollrBear.Views.AnswerForm = Backbone.DashboardView.extend({
  template: JST['answers/form'],
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click .submit-answer-data': 'submitAnswerData',
    'click .submit-answer-new-question': 'submitAnswerNewQuestion'
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
      window.setTimeout(function(){}, 20);
    });
    var view = new PollrBear.Views.PollForm({
      model: PollrBear.currentUser
    });
    $('.panel-new-poll').html(view.render().$el);
  }
  // submitAnswerNewQuestion: function(event) {
  //   event.preventDefault();
  //   var that = this;
  //   var answers = this.collection;
  //   var question_id = this.model.id;
  //   this.$('option').each(function(index, value) {
  //     var str = value.value;
  //     answers.create({
  //       text: str,
  //       question_id: question_id
  //     });
  //   });
  //   window.setTimeout(function() {
  //     var pollView = new PollrBear.Views.PollShow({
  //       model: this.model
  //     });
  //     $('#current-poll').html(pollView.render().$el);
  //   }, 500);
  //   });
  // }
});
