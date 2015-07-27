PollrBear.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],
  initialize: function() {
    this.model = PollrBear.currentUser;
    this.model.fetch();
    this.listenTo(this.model, 'change', this.renderUser);
  },
  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.renderUser();
    return this;
  },
  renderUser:function() {
    var view = new PollrBear.Views.UserShow({
      model: this.model
    });
    this.$("#user").html(view.render().$el);
  }
});
