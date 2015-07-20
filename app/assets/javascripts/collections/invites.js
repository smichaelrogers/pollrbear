PollrBear.Collections.Invites = Backbone.Collection.extend({
  model: PollrBear.Models.Invite,
  url: '/api/invites',
  initialize: function(models, options) {
    this.answer = options.answer,
    this.user = options.user
  },
  getOrFetch: function (id) {
    var invite = this.get(id);
    if (!invite) {
      invite = new PollrBear.Models.Invite({ id: id });
      invite.fetch({
        success: function () {
          this.add(invite);
        }.bind(this)
      });
    } else {
      invite.fetch();
    }
    return invite;
  }
});
