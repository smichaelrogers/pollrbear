PollrBear.Collections.Answers = Backbone.Collection.extend({
  model: PollrBear.Models.Answer,
  url: '/api/answers',
  initialize: function(models, options) {
    this.question = options.question;
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
