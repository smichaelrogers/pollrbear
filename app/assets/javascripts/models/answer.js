PollrBear.Models.Answer = Backbone.Model.extend({
  urlRoot: '/api/responses',
  responses: function() {
    if (!this._responses) {
      this._responses = new PollrBear.Collections.Responses([], { answer: this });
    }
    return this._responses;
  },
  parse: function(response) {
    if(response.responses) {
      this.responses().set(response.responses, { parse: true })
      delete response.responses;
    }
    return responses;
  }
});
