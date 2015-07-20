PollrBear.Collections.Follows = Backbone.Collection.extend({
  model: PollrBear.Models.follow,
  url: '/api/follows',
  initialize: function(models, options) {
    this.answer = options.answer,
    this.user = options.user
  },
  getOrFetch: function (id) {
    var follow = this.get(id);
    if (!follow) {
      follow = new PollrBear.Models.Follow({ id: id });
      follow.fetch({
        success: function () {
          this.add(follow);
        }.bind(this)
      });
    } else {
      follow.fetch();
    }
    return follow;
  }
});
