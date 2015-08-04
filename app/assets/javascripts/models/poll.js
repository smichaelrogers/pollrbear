PollrBear.Models.Poll = Backbone.Model.extend({
  urlRoot: '/api/polls',
  answers: function() {
    if (!this._answers) {
      this._answers = new PollrBear.Collections.Answers([], {
        poll: this
      });
    }
    return this._answers;
  },
  parse: function(response) {
    if (response.answers) {
      this.answers().set(response.answers);
    }
    return response;
  }
});
