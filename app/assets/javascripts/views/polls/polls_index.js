PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  tagName: "table",
  className: "table table-striped",
  id: "poll-list",
  events: {
    "click .select-poll": "selectPoll"
  },
  render: function() {
    var content = this.template({
      polls: this.collection,
      user: this.model
    });
    this.$el.html(content);
    return this;
  },
  selectPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr("data-poll-id");
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: poll.answers(),
      parentView: this
    });
    this._swapMainView(view);
  },
  numResponses: function() {
    var num = 0;

  }

});
