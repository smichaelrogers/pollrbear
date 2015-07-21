PollrBear.Views.QuestionForm = Backbone.DashboardView.extend({
  template: JST['questions/form'],
  events: {
    'click .add-question': 'addQuestion',
    'click .submit-poll-data': 'submitPollData'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.render();
  },
  render: function() {
    var content = this.template({
      collection: this.collection
    });
    this.$el.html(content);
    return this;
  },
  submitQuestionData: function(event) {
    var that = this;
    var questions = this.model.questions();
    var poll = this.model;
    var formData = this.$('.new-question-form').serializeJSON();
    formData["poll_id"] = this.model.id;
    this.collection.create(formData, {
      success: function() {
        var view = new PollrBear.Views.QuestionForm({
          collection: questions,
          model: poll
        }, {
          success: function() {
            that.swapView(new)
          }
        });
      }
    });
  }
});
