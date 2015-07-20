PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],
  events: {
    'click a': 'showCurrentUser'
  },
  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);
    this.showCurrentUser();
  },
  render: function(){
    var html = this.template({ users: this.collection });
    this.$el.html(html);
    return this;
  },
  showCurrentUser: function(event) {
    var view = new PollrBear.Views.PollsIndex({
      model: PollrBear.currentUser
    });
    this.$el.html(view.render().$el);
  }
});
