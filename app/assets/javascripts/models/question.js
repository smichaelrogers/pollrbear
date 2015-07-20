PollrBear.Models.Question = Backbone.Model.extend({
  urlRoot: '/api/questions',
  answers: function() {
    if (!this._answers) {
      this._answers = new PollrBear.Collections.Answers([], { question: this });
    }
    return this._answers;
  },
  charts: function () {
    if (!this._charts) {
      this._charts = new PollrBear.Collections.Charts([], { question: this });
    }
    return this._charts;
  },
  noChart: function () {
    this._charts = null;
    return null;
  },
  parse: function(response) {
    if(response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }
    return response;
  }
});
