PollrBear.Views.UserShow = Backbone.DashboardView.extend({
  template: JST['users/show'],

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
