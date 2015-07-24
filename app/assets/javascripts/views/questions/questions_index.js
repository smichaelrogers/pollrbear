PollrBear.Views.QuestionsIndex = Backbone.DashboardView.extend({
  template: JST['questions/index'],
  events: {
    'click .show-results': 'showResults'
  },

  initialize: function() {
    this.render();
  },
  render: function() {
    var content = this.template({
      questions: this.collection,
      poll: this.model
    });
    this.$el.html(content);
    this.renderQuestions();
    return this;
  },

  renderQuestions: function() {
    var that = this;
    this.collection.forEach(function(question) {
      var view = new PollrBear.Views.QuestionShow({
        poll: that.collection,
        model: question
      });
      this.addSubview('ul.poll-questions', view);
    }.bind(this));
  },

  showResults: function(event) {
    event.preventDefault();
    $('li.question-results').removeClass('.collapsed');
  }

});
