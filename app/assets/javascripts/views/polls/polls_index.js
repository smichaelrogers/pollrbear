PollrBear.Views.PollsIndex = Backbone.View.extend({
  tagName: 'section',
  template: JST['polls/index'],
  events: {
    "click .select-poll": "selectPoll"
  },
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function() {
    var content = this.template({
      polls: this.collection
    });
    this.$el.html(content);
    return this;
  },
  submitForm: function(event) {
    event.preventDefault();
    var that = this;
    var pollId = $(event.currentTarget).attr("data-poll-id");
    var poll = PollrBear.currentUser.polls().getOrFetch(pollId);
    var $checked = this.$("input:checked");
    $checked.each(function(index, value) {
      PollrBear.currentUser.responses().create({
        answer_id: value.value,
        user_id: PollrBear.currentUser.id
      });
    })
  },
  selectPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr("data-poll-id");
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollShow({
      model: poll
    });
    this._swapView(view);
  }
});
