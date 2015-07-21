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
    this.showUserPages();
    return this;
  },

  showUserPages: function() {
    var that = this;
    this.collection.forEach(function(user) {
      var view = new PollrBear.Views.UserShow({
        model: user
      });
      that.addSubview("#users", view);
    });
  }
});
