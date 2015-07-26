PollrBear.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  initialize: function() {
    this.collection = this.model.polls();
    this.collection.fetch();
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
    $("#polls").html(view.render().$el);
  },

  showPollForm: function() {
    var view = new PollrBear.Views.PollForm({
      collection: this.collection
    });
    $("#new-poll").html(view.render().$el);
  }
});
