PollrBear.Views.Footer = Backbone.DashboardView.extend({

  initialize: function(options){
    this.listenTo(PollrBear.currentUser, "sync", this.render);
    this.render();
  },

  template: JST['shared/footer'],

  render: function(){
    var html = this.template({ currentUser: PollrBear.currentUser });
    this.$el.html(html);

    return this;
  }

});
