PollrBear.Views.PollForm = Backbone.DashboardView.extend({
  template: JST['polls/form'],
  events: {
    'click .submit-poll-data': 'submitPollData'
  },

  initialize: function() {
    this.collection = this.model.polls();
    this.listenTo(this.collection, 'add', this.render);
    this.render();
  },
  render: function() {
    var content = this.template({
      collection: this.collection
    });
    this.$el.html(content);
    return this;
  },
  submitPollData: function(event) {
    event.preventDefault();
    var that = this;
    var questions = this.model.questions();
    var poll = this.model;
    var formData = this.$('.new-poll-form').serializeJSON();
    formData["user_id"] = this.model.id;
    this.collection.create(formData, {
      success: function() {
        var view = new PollrBear.Views.QuestionForm({
          model: poll
        });
        that.$el.html(view.render().$el);
      }
    });
  }
});
