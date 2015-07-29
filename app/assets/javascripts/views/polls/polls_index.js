PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  tagName: "div",
  className: "list-group",
  events: {
    "click .select-poll": "selectPoll"
  },
  initialize: function() {
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
    var $target = $(event.currentTarget).find(".poll-show")
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: poll.answers()
    });
    this.addSubview($target, view)
  }
});
