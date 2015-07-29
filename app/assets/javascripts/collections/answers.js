PollrBear.Collections.Answers = Backbone.Collection.extend({
  model: PollrBear.Models.Answer,
  url: '/api/answers',
  comparator: function() {
  },
  initialize: function(models, options) {
    this.poll = options.poll;
  },
  getOrFetch: function (id) {
    var answer = this.get(id);
    if (!answer) {
      answer = new PollrBear.Models.Answer({ id: id });
      answer.fetch({
        success: function () {
          this.add(answer);
        }.bind(this)
      });
    } else {
      answer.fetch();
    }
    return answer;
  }
});
