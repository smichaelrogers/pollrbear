PollrBear.Views.PollsIndex = Backbone.DashboardView.extend({
  template: JST['polls/index'],
  events: {
    'click .show-poll': 'showPoll'
  },

  initialize: function() {
    this.collection = this.model.polls();
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'change', this.delegateAccess);
  },
  render: function() {
    var content = this.template({
      polls: this.collection
    });
    this.$el.html(content);
    return this;
  },

  delegateAccess: function() {
    var $buttonGroups = this.$('.btn-access'),
        poll, pollId, polls = this.collection,
        modButtons = this.buttonGroups['moderator'],
        pubButtons = this.buttonGroups['visitor'],
        currentUserId = PollrBear.currentUser.id;
    $buttonGroups.each(function(index) {
      var pollId = $(this).attr('data-id');
      var poll = polls.getOrFetch(pollId);
      if (poll.user_id === currentUserId) {
        $(this).append(modButtons);
      } else {
        $(this).append(pubButtons);
      };
    });
  },

  //====================================================================

  showPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollShow({
      model: poll
    });
    this._swapView(view);
  }
});
