PollrBear.Views.UsersIndex = Backbone.DashboardView.extend({
  template: JST['users/index'],
  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function(){
    var html = this.template({ users: this.collection });
    this.$el.html(html);
    return this;
  }
});
