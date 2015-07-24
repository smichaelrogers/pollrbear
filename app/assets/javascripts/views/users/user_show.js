PollrBear.Views.UserShow = Backbone.DashboardView.extend({
  template: JST['users/show'],
  initialize: function() {
    this.collection = PollrBear.currentUser.polls();
    this.questions = PollrBear.currentUser.questions();
    this.answers = PollrBear.currentUser.answers();
    this.responses = this.model.responses();
    this.collection.fetch();
    this.model.fetch();
    this.questions.fetch();
    this.answers.fetch();
    this.responses.fetch();
    this.listenTo(this.model, 'sync', this.render);
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
      collection: this.collection
    });
    this.addSubview('#user-polls', view);
  },

  showPollForm: function() {
    var view = new PollrBear.Views.PollForm({
      collection: this.collection
    });
    this.addSubview('#new-poll-form', view);
  },

  showUserProfile: function() {
    var view = new PollrBear.Views.UserProfile({
      model: this.model
    });
    this.addSubview('#user-profile', view);
  }
});
