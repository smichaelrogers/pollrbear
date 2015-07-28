PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  events: {
    "click .select-poll": "selectPoll"
  },
  initialize: function() {
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
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollShow({
      model: poll
    });
    $(".row-collapsible").addClass("collapsed");
    this.addSubview("#poll", view);
  }
});
