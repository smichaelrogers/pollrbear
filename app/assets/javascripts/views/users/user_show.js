PollrBear.Views.UserShow = Backbone.DashboardView.extend({
  template: JST['users/show'],
  className: 'container',
  tagName: 'section',
  id: 'idx',

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.generateUserContent();
    return this;
  },

  renderPollForm: function(event) {
    var view = new PollrBear.Views.PollForm({
      collection: PollrBear.currentUser.polls()
    });
    this.addSubview('.panel-new-poll', view);
  },

  generateUserContent: function() {
    var formSV = new PollrBear.Views.PollForm({
      collection: PollrBear.currentUser.polls()
    });
    var pollsSV = new PollrBear.Views.PollsIndex({
      collection: PollrBear.currentUser.polls()
    });
    var questionsSV = new PollrBear.Views.QuestionsIndex({
      collection: PollrBear.currentUser.questions()
    });
    var answersSV = new PollrBear.Views.AnswersIndex({
      collection: PollrBear.currentUser.answers()
    });
    var responsesSV = new PollrBear.Views.ResponsesIndex({
      collection: PollrBear.currentUser.responses()
    });
    var invitesSV = new PollrBear.Views.InvitesIndex({
      collection: PollrBear.currentUser.invites()
    });
    this.addSubview('.panel-new-poll', formSV);
    this.addSubview('.panel-polls', pollsSV);
    this.addSubview('.panel-questions', questionsSV);
    this.addSubview('.panel-answers', answersSV);
    this.addSubview('.panel-responses', responsesSV);
    this.addSubview('.panel-invites', invitesSV);
  }
});
