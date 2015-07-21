PollrBear.Views.UsersShow = Backbone.DashboardView.extend({
  template: JST['users/show'],

  events: {
    'click .show-user-polls': 'showUserPolls'
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var polls = PollrBear.currentUser.polls();
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  },



  showUserPolls: function(event) {
    event.preventDefault();
    var view = new PollrBear.Views.PollsIndex({
      model: this.model
    });
    this.addSubview('.user-polls', view);
  }

});
