PollrBear.Views.UserShow = Backbone.DashboardView.extend({
  template: JST['users/show'],
  className: 'container-fluid',

  initialize: function(options) {
    this.collection = this.model.polls();
    this.listenTo(this.model, "sync", this.render);
    this.questions = this.model.questions();
    this.answers = this.model.answers();
    this.responses = this.model.responses();
    },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.showUserPolls();
    this.showUserQuestions();
    this.showUserAnswers();
    this.showUserResponses();
    this.showPollForm();
    return this;
  },
  showPollForm: function(event) {
    var view = new PollrBear.Views.PollForm({
      model: this.model
    });
    this.$('.new-poll-form').html(view.render().$el);
  },
  showUserPolls: function(event) {
    var view = new PollrBear.Views.PollsIndex({
      collection: this.collection
    });
    this.$('.user-polls').html(view.render().$el);
  },
  showUserQuestions: function(event) {
    var view = new PollrBear.Views.QuestionsIndex({
      collection: this.questions
    });
    this.$('.user-questions').html(view.render().$el);
  },
  showUserAnswers: function(event) {
    var view = new PollrBear.Views.AnswersIndex({
      collection: this.answers
    });
    this.$('.user-answers').html(view.render().$el);
  },
  showUserResponses: function(event) {
    var view = new PollrBear.Views.ResponsesIndex({
      collection: this.responses
    });
    this.$('.user-responses').html(view.render().$el);
  }

});
