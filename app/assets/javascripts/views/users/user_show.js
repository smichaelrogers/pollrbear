PollrBear.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: "container",
  initialize: function(options) {
    this.users = options.users;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'update', this.render);
    this.model.fetch();
    this.collection.fetch();
  },

  render: function() {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.showUserPolls();
    this.showPollForm();
    window.setTimeout(function() {
      this.renderUserData();
    }.bind(this), 200);
    return this;
  },

  showUserPolls: function() {
    var view = new PollrBear.Views.PollsIndex({
      collection: this.collection,
      model: this.model
    });
    $("#main").append(view.render().$el);
  },

  showPollForm: function() {
    var view = new PollrBear.Views.PollForm({
      collection: this.collection
    });
    $("#new-poll").html(view.render().$el);
  },

  renderUserData: function() {
    var r = 0, p = 0, a = 0, s = 0, i = 0, v = 0;

    this.model.polls().forEach(function(poll) {
      p++;
      $("#poll-count").text(p + "");
      poll.answers().forEach(function(answer) {
        a++;
        $("#answer-count").text(a + "");
        r += answer.attributes.responses.length;
        $("#response-count").text(r + "");
      });
    });
    if (this.model.attributes.invites) {
      i = this.model.attributes.invites.length;
    }
    if (this.model.attributes.votes) {
      v = this.model.attributes.votes.length;
    }

    $("#vote-count").text(v + "");
    $("#invite-count").text(i + "");
  }
});
