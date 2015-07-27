PollrBear.Collections.Questions = Backbone.Collection.extend({
  model: PollrBear.Models.Question,
  url: '/api/questions',
  initialize: function(models, options) {
    this.poll = options.poll;
  },
  getOrFetch: function(id) {
    var question = this.get(id);
    if (!question) {
      question = new PollrBear.Models.Question({
        id: id
      });
      question.fetch({
        success: function() {
          this.add(question);
        }.bind(this)
      });
    } else {
      question.fetch();
    }
    return question;
  },
  parse: function(response) {
    this.page = response.page;
    if(response.poll) {
      this.poll.set(response.poll);
    }
    return response.models;
  }
});
