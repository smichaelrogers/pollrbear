PollrBear.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  responses: function() {
    if (!this._responses) {
      this._responses = new PollrBear.Collections.Responses([], { user: this });
    }
    return this._responses;
  },
  polls: function() {
    if (!this._polls) {
      this._polls = new PollrBear.Collections.Polls([], { user: this });
    }
    return this._polls;
  },
  parse: function(response) {
    if(response.responses) {
      this.responses().set(response.responses, { parse: true});
      delete response.responses;
    };
    if(response.polls) {
      this.polls().set(response.polls, { parse: true });
      delete response.polls;
    };
    return response;
  },

  fullName: function(){
    return this.escape("first_name") + " " + this.escape("last_name");
  },

  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
  }
});

PollrBear.Models.CurrentUser = PollrBear.Models.User.extend({

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
    } else {
      this.trigger("signOut");
    }
  }

});
