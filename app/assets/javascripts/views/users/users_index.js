PollrBear.Views.UsersIndex = Backbone.View.extend({
  template: JST["users/index"],
  
  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    Backbone.history.navigate("/users/" + this.model.id, {trigger: true});
    return this;
  }
});
