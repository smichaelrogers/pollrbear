PollrBear.Collections.Responses = Backbone.Collection.extend({
  model: PollrBear.Models.Response,
  url: '/api/responses',
  initialize: function(models, options) {
    this.answer = options.answer;
    this.user = options.user;
  },
  getOrFetch: function (id) {
    var response = this.get(id);
    if (!response) {
      response = new PollrBear.Models.Response({ id: id });
      response.fetch({
        success: function () {
          this.add(response);
        }.bind(this)
      });
    } else {
      response.fetch();
    }
    return response;
  }
});
