PollrBear.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  //
  // fullName: function(){
  //   return this.escape("first_name") + " " + this.escape("last_name");
  // },

  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
  }
});

BackboneAuthDemo.Models.CurrentUser = BackboneAuthDemo.Models.User.extend({

  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
      console.log("currentUser is signed in!", this);
    } else {
      this.trigger("signOut");
      console.log("currentUser is signed out!", this);
    }
  }

});



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
