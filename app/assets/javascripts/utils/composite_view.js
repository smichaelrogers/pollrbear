Backbone.CompositeView = Backbone.View.extend({
  _swapMainView: function (view) {
    this._mainView && this._mainView.remove();
    this._mainView = view;
    $("#main").html(view.render().$el);
  },

  events: {
    "click .dismiss": "dismissNotice"
  },

  renderNotice: function($target, message) {
    var n = "<span class=\"notice notice-flash\"><span class=\"notice-text\">" + message + "<a href=\"#\" class=\"dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>";
    $target.prepend(n);
  },

  renderNoticeBefore: function($target, message) {
    var n = "<span class=\"notice notice-flash\"><span class=\"notice-text\">" + message + "<a href=\"#\" class=\"dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>";
    $target.before(n);
  },

  dismissNotice: function(event) {
    event.preventDefault();
    $(".notice").remove();
  },

  renderLoader: function($target) {
    var loaderStr = "<div class=\"loader\"><div class=\"loader-wrap\"><i class=\"fa fa-circle-o-notch fa-spin fa-3x\"></i></div></div>";
    $target.append(loaderStr);
    $target.find(".loader").fadeIn();
  }
});
