PollrBear.Collections.Users = Backbone.Collection.extend({
  model: PollrBear.Models.user,
  url: '/users',
  initialize: function() {},

  getOrFetch: function (id) {
    var user = this.get(id);
    if (!user) {
      user = new PollrBear.Models.User({ id: id });
      user.fetch({
        success: function () {
          this.add(user);
        }.bind(this)
      });
    } else {
      user.fetch();
    }
    return user;
  }
});
