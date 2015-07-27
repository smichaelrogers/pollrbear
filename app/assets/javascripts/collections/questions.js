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
    var resp = {};
    this.page = response.page;
    this.total_pages = response.total_pages;
    resp.models = [];
    resp.parent = PollrBear.currentUser.polls().getOrFetch(response.parent.id);
    var q;
    response.models.forEach(function(question) {
      q = this.getOrFetch(question.id);
      resp.models.push(q);
    }.bind(this));
    return resp;
  }
});
