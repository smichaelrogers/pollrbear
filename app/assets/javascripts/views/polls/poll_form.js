PollrBear.Views.PollForm = Backbone.View.extend({
  template: JST['polls/form'],
  events: {
    'click .submit-poll-data': 'submitPollData',
    'input #poll-input-title': 'updateTitle'
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  updateTitle: function(event) {
    $("#poll-title").text($("#poll-input-title").val());
  },

  submitPollData: function(event) {
    event.preventDefault();
    var pollFormData = this.$('.new-poll-form').serializeJSON();
    pollFormData.questions = [];

    $("#poll-form-poll").addClass("collapsed");
    var view = new PollrBear.Views.QuestionForm({
      pollFormData: pollFormData
    });
    console.log(pollFormData);
    $("#poll-form-questions").html(view.render().$el);
  }
});
