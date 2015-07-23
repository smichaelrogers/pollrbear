PollrBear.Views.PollsIndex = Backbone.DashboardView.extend({
  template: JST['polls/index'],
  events: {
    'click a.trigger': 'showPoll'
  },
  initialize: function() {
    this.collection.fetch();
    // this.listenTo(this.collection, 'sync', this.render);

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
    var $target = this.$("ul[data-poll-id=\"" + pollId + "\"]");
    if ( $target.hasClass("collapsed") ) {
      var view = new PollrBear.Views.QuestionsIndex({
        collection: poll.questions()
      });
      $target.removeClass('collapsed');
    } else {
      $target.addClass('collapsed');
    };
  }

});
