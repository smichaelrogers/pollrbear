PollrBear.Views.UsersShow = Backbone.DashboardView.extend({
  template: JST['users/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var polls = PollrBear.currentUser.polls();
    var content = this.template({
      user: this.model,
      polls: polls
    });
    this.$el.html(content);
    this.addPollsIndex();
    return this;
  },

  addPollsIndex: function() {
    var view = new PollrBear.Views.PollsIndex({
      model: this.model
    });
    this.addSubview('#polls', view);
  }

});
