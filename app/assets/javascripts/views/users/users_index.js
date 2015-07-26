PollrBear.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.renderUser();
    return this;
  },

  renderUser: function() {
    var view = new PollrBear.Views.UserShow({
      model: PollrBear.currentUser
    });
    $('#user').html(view.render().$el);
  },

  generateUserData: function() {

  },

  renderUserSocial: function() {
    var view = new PollrBear.Views.UserSocial({
      model: PollrBear.currentUser,
      collection: this.collection
    });
    $("#community").html(view.render().$el);
  }

});
