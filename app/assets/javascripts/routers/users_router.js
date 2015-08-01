PollrBear.Routers.Users = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new PollrBear.Collections.Users();
    this.collection.fetch();
  },

  routes: {
    "": "index",
    "users/new": "new",
    "session/new": "signIn"
  },

  index: function() {
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) {
      return;
    }
    var users = this.collection;
    users.fetch();
    var user = users.getOrFetch(PollrBear.currentUser.id);
    var polls = user.polls();
    var indexView = new PollrBear.Views.UserShow({
      collection: polls,
      model: user,
      users: users
    });
    this._swapView(indexView);
  },

  new: function() {
    if (!this._requireSignedOut()) {
      return;
    }
    var model = new this.collection.model();
    var formView = new PollrBear.Views.UserForm({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  signIn: function(callback) {
    if (!this._requireSignedOut(callback)) {
      return;
    }

    var signInView = new PollrBear.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback) {
    if (!PollrBear.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }
    return true;
  },

  _requireSignedOut: function(callback) {
    if (PollrBear.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }
    return true;
  },

  _goHome: function() {
    Backbone.history.navigate("", {
      trigger: true
    });
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
