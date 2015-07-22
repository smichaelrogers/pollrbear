PollrBear.Views.PollForm = Backbone.DashboardView.extend({
  template: JST['polls/form'],
  events: {
    'click .submit-poll-data': 'submitPollData'
  },

  initialize: function() {},
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submitPollData: function(event) {
    event.preventDefault();
    var formData = this.$('.new-poll-form').serializeJSON();
    formData.user_id = PollrBear.currentUser.id
    var poll = this.collection.create(formData);

    var view = new PollrBear.Views.QuestionForm({
      collection: PollrBear.currentUser.questions(),
      model: poll
    });
  }
});
