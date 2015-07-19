PollrBear.Models.User = Backbone.Model.extend({
  urlRoot: '/user',
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
  },
  parse: function(response) {
    if (response.polls) {
      this.polls().set(response.polls, {
        parse: true
      })
      delete response.polls;
    }
    if (response.responses) {
      this.responses().set(response.responses, {
        parse: true
      })
      delete response.responses;
    }
    return response;
  }
});

PollrBear.Models.CurrentUser = Backbone.Models.User.extend({
  url: '/session',
  initialize: function() {
    this.listenTo(this, 'change', this.checkUserState);
    this.userId = this.currentUserId();
  },
  currentUserId: function() {
    var sendId = this.userId;
    $.ajax({
      url: this.url,
      type: "GET",
      data: sendId,
      success: function(data) {
        if (data['current_user_id'] === sendId) {
          console.log('You are the current user');
        }
        return data['current_user_id'];
      }
    });
  },
  checkUserState: function(event) {
    var currentId = this.currentUserId();
    if (this.userId !== currentId) {
      alert('not current user');
    } else {
      console.log('logged in');
    };
  }


});
