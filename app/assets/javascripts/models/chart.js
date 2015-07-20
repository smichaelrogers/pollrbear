PollrBear.Models.Chart = Backbone.Model.extend({
  urlRoot: '/api/charts',
  answers: function() {
    if (!this._answers) {
      this._answers = new PollrBear.Collections.Answers([], { chart: this });
    }
    return this._answers;
  }
});
