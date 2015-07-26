PollrBear.Views.PollForm = Backbone.View.extend({
  template: JST['polls/form'],
  events: {
    'click .submit-poll-data': 'submitPollData'
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submitPollData: function(event) {
    event.preventDefault();
    var formData = this.$('.new-poll-form').serializeJSON();
    var poll = this.collection.create(formData);
    $("#poll-form-poll").addClass("collapsed");

    $(document).ajaxComplete(function() {
      var view = new PollrBear.Views.QuestionForm({
        collection: PollrBear.currentUser.questions(),
        model: poll
      });
      $("#poll-form-questions").html(view.render().$el);
    });
  }
});
