PollrBear.Collections.Comments = Backbone.Collection.extend({
  model: PollrBear.Models.Comment,
  url: '/api/comments',
  initialize: function(models, options) {
    this.poll = options.poll;
  },
  getOrFetch: function (id) {
    var comment = this.get(id);
    if (!comment) {
      comment = new PollrBear.Models.Comment({ id: id });
      comment.fetch({
        success: function () {
          this.add(comment);
        }.bind(this)
      });
    } else {
      comment.fetch();
    }
    return comment;
  }

});
