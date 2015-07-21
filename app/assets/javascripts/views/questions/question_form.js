PollrBear.Views.QuestionForm = Backbone.DashboardView.extend({
  template: JST['questions/form'],
  events: {
    'click .add-questions': 'addQuestions'
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
  addQuestions: function() {
    var view = new PollrBear.Views.QuestionForm({
      collection: this.collection
    });
    this._swapView(view);
  },
  submitQuestionData: function(event) {
    var that = this;
    var questions = this.model.questions();
    var poll = this.model;
    var formData = this.$('#new-poll-panel').serializeJSON();
    formData["user_id"] = this.model.id;
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
