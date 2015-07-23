PollrBear.Views.UserShow = Backbone.DashboardView.extend({
  template: JST['users/show'],

  initialize: function() {
    this.render();
  },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.showUserPolls();
    this.showPollForm();
    return this;
  },

  showUserPolls: function() {
    var view = new PollrBear.Views.PollsIndex({
      collection: PollrBear.currentUser.polls()
    });
    this.addSubview('#user-polls', view);
  },

  showPollForm: function() {
    var view = new PollrBear.Views.PollForm({
      collection: PollrBear.currentUser.polls()
    });
    this.addSubview('#new-poll-form', view);
  }
});
//
// generateUserContent: function() {
//   var pollsSV = new PollrBear.Views.PollsIndex({
//     collection: PollrBear.currentUser.polls()
//   });
//   var questionsSV = new PollrBear.Views.QuestionsIndex({
//     collection: PollrBear.currentUser.questions()
//   });
//   var answersSV = new PollrBear.Views.AnswersIndex({
//     collection: PollrBear.currentUser.answers()
//   });
//   var responsesSV = new PollrBear.Views.ResponsesIndex({
//     collection: PollrBear.currentUser.responses()
//   });
//   var invitesSV = new PollrBear.Views.InvitesIndex({
//     collection: PollrBear.currentUser.invites()
//   });
//   this.addSubview('#panels', formSV);
//   this.addSubview('#panels', questionsSV);
//   this.addSubview('#panels', answersSV);
//   this.addSubview('#panels', responsesSV);
//   this.addSubview('#panels', invitesSV);
// }
