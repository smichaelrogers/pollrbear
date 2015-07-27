PollrBear.Routers.Users = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = new PollrBear.Collections.Users();
    this.collection.fetch();
  },

  routes: {
    "": "index",
    "users/new": "new",
    "users/:id": "show",
    "session/new": "signIn",
    "polls/:id": "showPoll",
    "questions/:id": "showQuestion",
    "answer/:id": "showAnswer",
    "response/:id": "showResponse"
  },

  index: function(){
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    var indexView = new PollrBear.Views.UsersIndex({
      model: PollrBear.currentUser,
      collection: this.collection
    });
    this._swapView(indexView);
  },

  new: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new this.collection.model();
    var formView = new PollrBear.Views.UserForm({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  show: function(id){
    var callback = this.show.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; };
    var user = this.collection.getOrFetch(id);
    var showView = new PollrBear.Views.UserShow({
      model: user
    });
    this._swapView(showView);
  },
  showPoll: function(id){
    var poll = PollrBear.currentUser.polls().getOrFetch(id);
    var questions = poll.questions();
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: questions
    });
    this._swapView(view);
  },
  showQuestion: function(id){
    var question = PollrBear.currentUser.questions().getOrFetch(id);
    var answers = question.answers();
    var view = new PollrBear.Views.QuestionShow({
      model: question,
      collection: answers
    });
    this._swapView(view);
  },
  showAnswer: function(id){
    var answer = PollrBear.currentUser.answers().getOrFetch(id);
    var view = new PollrBear.Views.AnswerShow({
      model: answer
    });
    this._swapView(view);
  },
  showResponse: function(id){
    var response = this.model.responses().getOrFetch(id);
    var view = new PollrBear.Views.ResponseShow({
      model: response
    });
    this._swapView(view);
  },
  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new PollrBear.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback){
    if (!PollrBear.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (PollrBear.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
