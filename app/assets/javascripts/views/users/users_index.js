PollrBear.Views.UsersIndex = Backbone.View.extend({
  template: JST["users/index"],
  initialize: function() {
    this.trigger('sync');
  },
  render: function() {
    var content = this.template({
      user: this.model,
      users: this.collection
    });
    this.$el.html(content);
    Backbone.history.navigate("/users/" + this.model.id, {trigger: true});
    return this;
  }
});
