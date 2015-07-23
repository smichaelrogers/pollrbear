PollrBear.Views.UserShow = Backbone.DashboardView.extend({
  template: JST['users/show'],

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.model.fetch();
    this.model.questions().fetch();
    this.model.answers().fetch();
    this.model.polls().fetch();
    this.model.invites().fetch;
    this.$el.html(content);
    this.showUserPolls();
    this.showPollForm();
    this.showUserProfile();
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
  },

  showUserProfile: function() {
    var view = new PollrBear.Views.UserProfile({
      model: this.model
    });
    this.addSubview('#user-profile', view);
  },

  showUserInfo: function() {
    var view = new PollrBear.Views.UserInfo({
      model: this.model
    });
    this.addSubview('#user-info', view);
  }
});
