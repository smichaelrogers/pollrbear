PollrBear.Views.AnswerForm = Backbone.DashboardView.extend({
  template: JST['answers/form'],
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click .submit-answer-data': 'submitAnswerData'
  },

  initialize: function(options) {},
  render: function() {
    var content = this.template();
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
  submitAnswerData: function(event) {
    event.preventDefault();
    var formData = this.$('.new-answer-form').serializeJSON();
    formData.poll_id = this.model.id;
    var answer = this.collection.create(formData);

    var view = new PollrBear.views.AnswerForm({
      collection: PollrBear.currentUser.answers(),
      model: answer
    });
  }
});
