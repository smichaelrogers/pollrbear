PollrBear.Models.Poll = Backbone.Model.extend({
  urlRoot: '/api/polls',
  questions: function() {
    if (!this._questions) {
      this._questions = new PollrBear.Collections.Questions([], { poll: this });
    }
    return this._questions;
  },
  parse: function(response) {
    if(response.questions) {
      this.questions().set(response.questions);
    }
    return response;
  }
});
