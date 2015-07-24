PollrBear.Views.PollForm = Backbone.DashboardView.extend({
  template: JST['polls/form'],
  events: {
    'click .submit-poll-data': 'submitPollData'
  },
  initialize: function(options) {},
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submitPollData: function(event) {
    event.preventDefault();
    var that = this;
    var formData = this.$('.new-poll-form').serializeJSON();
    formData.user_id = PollrBear.currentUser.id
    var view = new PollrBear.Views.QuestionForm({
      collection: PollrBear.currentUser.questions(),
      model: this.collection.create(formData)
    });
    window.setTimeout(function () {
      this._swapView(view);
    }.bind(this), 200);
  }
});
