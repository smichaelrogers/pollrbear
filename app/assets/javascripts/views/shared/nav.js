PollrBear.Views.Nav = Backbone.View.extend({
  template: JST['shared/nav'],

  initialize: function(options){
    this.render();
    this.listenTo(PollrBear.currentUser, "signIn signOut", this.render);
  },

  events: {
    "click #sign-out-link": "signOut",
    'click .toggle-options': "toggleOptions"
  },
  render: function(){
    var html = this.template({ currentUser: PollrBear.currentUser });
    this.$el.html(html);

    return this;
  },
  signOut: function(event){
    event.preventDefault();
    PollrBear.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", { trigger: true });
      }
    });
  },
  toggleOptions: function(event) {
    event.preventDefault();
    this.$('.toggle-collapsed').toggleClass('toggle-expand');
  }

});
