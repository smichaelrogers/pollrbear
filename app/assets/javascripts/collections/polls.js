PollrBear.Collections.Polls = Backbone.Collection.extend({
  model: PollrBear.Models.Poll,
  url: '/api/polls',
  initialize: function(models, options) {
    this.user = options.user
  },
  getOrFetch: function (id) {
    var poll = this.get(id);
    if (!poll) {
      poll = new PollrBear.Models.Poll({ id: id });
      poll.fetch({
        success: function () {
          this.add(poll);
        }.bind(this)
      });
    } else {
      poll.fetch();
    }
    return poll;
  }
});

PollrBear.Collections.polls = new PollrBear.Collections.Polls
