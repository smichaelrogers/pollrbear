PollrBear.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: "container",
  initialize: function(options) {
    this.users = options.users;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.showUserPolls();

    return this;
  },

  showUserPolls: function() {
    var view = new PollrBear.Views.PollsIndex({
      collection: this.collection,
      model: this.model
    });
    $("#main").append(view.render().$el);
    this.showPollForm(view);
  },

  showPollForm: function(parentView) {
    var view = new PollrBear.Views.PollForm({
      collection: this.collection,
      model: this.model,
      parentView: parentView
    });
    $("#new-poll").html(view.render().$el);
  }
});
