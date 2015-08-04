PollrBear.Collections.Polls = Backbone.Collection.extend({
  model: PollrBear.Models.Poll,
  url: '/api/polls',
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
  },

  parse: function(response) {
    this.data = response.data;
    this.page = parseInt(response.page);
    this.total_pages = response.total_pages;
    return response.models;
  }
});
