PollrBear.Views.PollForm = Backbone.View.extend({
  template: JST['polls/form'],

  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answers': 'removeAnswers',
    'click #submit-poll-form': 'submitPollForm',
    'keypress .answer-input': 'maybeAddAnswer'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submitPollForm: function(event) {
    event.preventDefault();
    var pollFormData = $("#poll-form").serializeJSON();
    var answerFormData = $("#answer-form").serializeJSON();
    this.collection.create(pollFormData, {
      success: function(poll) {
        $('option').each(function(index, value) {
          poll.answers().create({
            poll_id: poll.id,
            text: value.value
          });
        });
      };
    });
  },

  maybeCreate: function(event) {
    if (event.keyCode === 13) {
      this.addAnswer();
    }
  },

  maybeAddAnswer: function(event) {
    var answer = this.$('.answer-input').val();
    this.$('.answer-input').val('');
    this.$('.new-answers').append("<option value=\"" + answer + "\">" + answer + "</option>");
  },

  removeAnswers: function(event) {
    this.$("select option:selected").each(function() {
      this.remove();
    });
  }
});
