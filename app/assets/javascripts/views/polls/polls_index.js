PollrBear.Views.PollsIndex = Backbone.DashboardView.extend({
  template: JST['polls/index'],

  events: {
    'click .show-poll': 'showPoll'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.fetch();
  },
  render: function() {
    var content = this.template({
      polls: this.collection
    });
    this.$el.html(content);
    return this;
  },
  showPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-poll-id');
    var poll = this.collection.getOrFetch(pollId);
    var $target = this.$("tr[data-poll-id=\"" + pollId + "\"]");
    var view = new PollrBear.Views.QuestionsIndex({
      collection: poll.questions()
    });

    this.addSubview($target, view);
  }

});
