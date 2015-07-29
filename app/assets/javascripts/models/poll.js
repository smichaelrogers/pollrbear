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
  responses: function() {
    if (!this._responses) {
      this._responses = new PollrBear.Collections.Responses([], {
        poll: this
      });
    }
    return this._responses;
  },
  parse: function(response) {
    if (response.answers) {
      this.answers().set(response.answers);
    };
    if (response.responses) {
      this.responses().set(response.responses);
    }
    return response;
  }
});
