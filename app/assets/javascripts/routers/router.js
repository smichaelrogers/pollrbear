PollrBear.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $("#content");
    this.collection = PollrBear.Collections.polls;
  },
  routes: { '': 'index' },
  index: function() {
    this.collection.fetch();
    var view = new PollrBear.Views.PollsIndex({
      collection: this.collection
    });
    this._swapView(view);
  },
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentview = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
