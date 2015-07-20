PollrBear.Views.PollsIndex = Backbone.DashboardView.extend({
  template: JST['polls/index'],
  events: {
    'click .show-poll': 'showPoll'
  },
  buttonGroups: {
    'moderator': "<button class=\"btn btn-default show-edit-poll-form\" data-id=\"<%= poll.id %>\">Edit</button><button class=\"btn btn-default show-delete-confirmation\" data-id=\"<%= poll.id %>\">Delete</button><button class=\"btn btn-default show-invite-form\" data-id=\"<%= poll.id %>\">Invite</button><button class=\"btn btn-default show-poll-report\" data-id=\"<%= poll.id %>\">Report</button>",
    'visitor': "<button class=\"btn btn-default show-poll\" data-id=\"<%= poll.id %>\">Participate</button>"
  },
  //====================================================================
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
