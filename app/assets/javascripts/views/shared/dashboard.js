PollrBear.Views.Dashboard = Backbone.View.extend({
  template: JST['shared/dashboard'],

  initialize: function(options){
    this.listenTo(PollrBear.currentUser, "signIn signOut", this.render);
    this.render();
  },

  events: {
    "click #sign-out-link": "signOut"
  },


  render: function(){
    var html = this.template({ currentUser: PollrBear.currentUser });
    this.$el.html(html);

    return this;
  },

  renderPollForm: function() {

  },

  signOut: function(event){
    event.preventDefault();
    PollrBear.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", { trigger: true });
      }
    });
  }

});
