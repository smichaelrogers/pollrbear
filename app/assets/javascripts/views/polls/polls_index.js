PollrBear.Views.PollsIndex = Backbone.DashboardView.extend({
  template: JST['polls/index'],

  events: {
    'click .show-poll': 'showPoll'
  },
  //====================================================================
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      polls: this.collection
    });
    this.$el.html(content);
    return this;
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
