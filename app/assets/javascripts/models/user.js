PollrBear.Models.User = Backbone.Model.extend({
  urlRoot: '/session',
  polls: function() {
    if (!this._polls) {
      this._polls = new PollrBear.Collections.Polls([], {
        user: this
      });
    }
  },
  responses: function() {
    if (!this._responses) {
      this._responses = new PollrBear.Collections.Responses([], {
        user: this
      });
    }
    return this._responses;
  }
});

PollrBear.Models.CurrentUser = PollrBear.Models.User.extend({
  url: '/session',
  initialize: function() {
    this.listenTo(this, 'change', this.checkUserState);
    this.userId = this.currentUserId();
  },
  currentUserId: function() {
    var sendId = this.userId;
    $.ajax({
      url: this.url,
      type: 'get',
      data: sendId,
      success: function(data) {
        if (data['current_user_id'] === sendId) {
          console.log('You are the current user');
        }
        return data['current_user_id'];
      }, error: function(data) {
        console.log('not logged in');
      }
    });
  },
  checkUserState: function(event) {
    var currentId = this.currentUserId();
    if (this.userId !== currentId) {
      console.log('not current user');
    } else {
      console.log('logged in');
    }
  }


});
