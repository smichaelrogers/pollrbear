PollrBear.Models.Poll = Backbone.Model.extend({
  urlRoot: '/api/polls',
  questions: function() {
    if (!this._questions) {
      this._questions = new PollrBear.Collections.Questions([], { poll: this });
    }
    return this._questions;
  },
  comments: function () {
    if (!this._comments) {
      this._comments = new PollrBear.Collections.Comments([], { poll: this });
    }
    return this._comments;
  },
  parse: function(response) {
    if(response.questions) {
      this.questions().set(response.questions, { parse: true })
      delete response.questions;
    }
    return response;
  }
});
