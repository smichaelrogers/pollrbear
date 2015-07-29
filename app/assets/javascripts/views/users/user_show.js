PollrBear.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: "container",
  initialize: function(options) {
    this.users = options.users;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.model.fetch();
    this.collection.fetch();
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
      collection: this.collection,
      model: this.model
    });
    $("#main").html(view.render().$el);
  },

  showPollForm: function() {
    var view = new PollrBear.Views.PollForm({
      collection: this.collection
    });
    $("#new-poll").html(view.render().$el);
  }
});
