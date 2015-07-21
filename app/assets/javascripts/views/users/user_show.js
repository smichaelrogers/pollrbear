PollrBear.Views.UserShow = Backbone.DashboardView.extend({
  template: JST['users/show'],
  tagName: 'section',
  className: 'container-fluid',
  events: {
    'click .close-panel': 'collapseAnswerPanel',
    'click #add-question': 'addQuestion'
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.answerOpen = false;
    this.polls = this.model.polls();
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
      model: this.model,
      collection: this.polls
    });
    this.$('#new-poll-form').html(view.render().$el);
  },
  showUserPolls: function(event) {
    var view = new PollrBear.Views.PollsIndex({
      collection: this.polls
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
      collection: this.questions
    });
    this.$('.user-responses').html(view.render().$el);
  }

});
