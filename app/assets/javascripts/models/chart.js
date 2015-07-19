PollrBear.Models.Chart = Backbone.Model.extend({
  urlRoot: '/api/charts',
  answers: function() {
    if (!this._answers) {
      this._answers = new PollrBear.Collections.Answers([], { chart: this });
    }
    return this._answers;
  },
  parse: function(response) {
    if(response.answers) {
      this.answers().set(response.answers, { parse: true })
      delete response.answers;
    }
    return response;
  }
});
