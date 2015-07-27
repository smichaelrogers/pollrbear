PollrBear.Models.Question = Backbone.Model.extend({
  urlRoot: '/api/questions',
  answers: function() {
    if (!this._answers) {
      this._answers = new PollrBear.Collections.Answers([], { question: this });
    }
    return this._answers;
  },
  parse: function(response) {
    if(response.answers) {
      this.answers().set(response.answers);
    }
    return response;
  }
});
