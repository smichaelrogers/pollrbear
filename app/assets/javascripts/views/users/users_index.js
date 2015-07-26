PollrBear.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  initialize: function() {
    this.model = PollrBear.currentUser;
    this.listenTo(this.collection, 'sync', this.render);
    this.model.fetch();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.renderUser();
    return this;
  },

  renderUser: function() {
    var view = new PollrBear.Views.UserShow({
      model: this.model
    });
    $('#user').html(view.render().$el);
  },

  generateUserData: function() {

  },

  renderUserSocial: function() {
    var view = new PollrBear.Views.UserSocial({
      model: this.model,
      collection: this.collection
    });
    $("#community").html(view.render().$el);
  }

});
