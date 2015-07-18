PollrBear.Models.Comment = Backbone.Model.extend({
  urlRoot: '/api/comments',
  comments: function() {
    if (!this._comments) {
      this._comments = new PollrBear.Collections.Comments([], { comment: this });
    }
    return this._comments;
  },
  parse: function(response) {
    if(response.comments) {
      this.comments().set(response.comments, { parse: true })
      delete response.comments;
    }
    return comments;
  }
});
