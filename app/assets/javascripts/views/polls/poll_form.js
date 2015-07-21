PollrBear.Views.PollForm = Backbone.DashboardView.extend({
  template: JST['polls/form'],
  events: {
    'click .next-to-questions': 'submitPollData'
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
  submitPollData: function(event) {
    var that = this;
    var questions = this.model.questions();
    var poll = this.model;
    var formData = this.$('.new-poll-form').serializeJSON();
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
