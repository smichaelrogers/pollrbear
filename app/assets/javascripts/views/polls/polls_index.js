PollrBear.Views.PollsIndex = Backbone.View.extend({
  template: JST['polls/index'],
  events: {
    "click .select-poll": "selectPoll"
  },
  initialize: function() {
    this.trigger('sync');
  },
  render: function() {
    var content = this.template({
      polls: this.collection
    });
    this.$el.html(content);
    return this;
  },
  selectPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr("data-poll-id");
    Backbone.history.navigate("/polls/" + pollId, { trigger: true });
  }
});
