PollrBear.Views.AnswerForm = Backbone.DashboardView.extend({
  template: JST['answers/form'],
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click .submit-answer-data': 'submitAnswerData'
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
      }, {
        success: function() {
          that.$el.html("<h4>Success!</h4>");
          var returnView = new PollrBear.Views.PollForm({
            collection: PollrBear.currentUser.polls()
          });
          window.setTimeout(function () {
            $('.panel-new-poll').html(returnView.render().$el);
          }, 500)
        }
      });
    });

  }
});
