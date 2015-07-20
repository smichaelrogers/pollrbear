PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],

  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);
    this.addHome();
    return this;
  },

  addHome: function(event) {
    var view = new PollrBear.Views.UsersShow({
      model: PollrBear.currentUser
    });
    this.addSubview('#idx', view);
  }
});
