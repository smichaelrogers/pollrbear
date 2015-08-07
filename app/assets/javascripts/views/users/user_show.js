PollrBear.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: "row",
  events: {
    "click .sign-out-link": "signOut"
  },
  initialize: function(options) {
    this.users = options.users;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.showUserPolls();
    this.showTrendingPolls();

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

  showUserPolls: function() {
    var view = new PollrBear.Views.PollsIndex({
      collection: this.collection,
      model: this.model
    });
    $("#main").append(view.render().$el);
    this.showPollForm(view);
  },

  showPollForm: function(parentView) {
    var view = new PollrBear.Views.PollForm({
      collection: this.collection,
      model: this.model,
      parentView: parentView
    });
    $("#new-poll").html(view.render().$el);
  },

  showTrendingPolls: function() {
    var userId = this.model.id;
    $.ajax({
      url: "/api/polls/trending/" + userId,
      dataType: 'json',
      type: "GET",
      success: function(trending) {
        console.log(trending);
      }
    });
  }
});
