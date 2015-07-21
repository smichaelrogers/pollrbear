PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],

  events: {
    'click .show-user-page': 'showUserPage'
  },

  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);
    return this;
  },

  showUserPage: function(event) {
    event.preventDefault();
    var userId = $(event.currentTarget).attr('data-id');
    var user = this.collection.getOrFetch(userId);
    var view = new PollrBear.Views.UsersShow({
      model: user
    });
    this.$('#user').html(view.render().$el);
  }
});
