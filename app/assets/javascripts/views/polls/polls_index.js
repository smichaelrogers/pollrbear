PollrBear.Views.PollsIndex = Backbone.View.extend({
  template: JST['polls/index'],
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  events: {
    "click .select-poll": "selectPoll"
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
    this.$("#poll").html(view.render().$el);
  }
});
