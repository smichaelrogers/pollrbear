Backbone.DashboardView = Backbone.View.extend({
  className: 'idx',
  tagName: 'section',
  events: {
    'click .toggle-footer-up': 'toggleFooterUp',
    'click .toggle-footer-down': 'toggleFooterDown',
    'click .toggle-footer-left': 'toggleFooterLeft',
    'click .toggle-footer-right': 'toggleFooterRight',
    'click .show-new-poll-form': 'showNewPollForm',
    'click .show-edit-poll-form': 'showEditPollForm',
    'click .submit-poll-form': 'submitPollForm',
    'click .show-delete-confirmation': 'showDeleteConfirmation',
    'click .submit-delete': 'submitDelete',
    'click .show-poll-info': 'showPollInfo',
    'click .show-poll-info': 'hidePollInfo',
    'click .show-poll-report': 'showPollReport',
    'click .show-user-profile': 'showUserProfile',
    'keydown input': 'maybeCreate'
  },

  toggleFooterBaseline: function() {
    this.$('#footer').removeClass('footer-mid, footer-full').addClass('footer-baseline');
  },
  toggleFooterMid: function() {
    this.$('#footer').removeClass('footer-baseline, footer-full').addClass('footer-mid');
  },
  toggleFooterFull: function() {
    this.$('#footer').removeClass('footer-baseline, footer-mid').addClass('footer-baseline');
  },
  toggleFooterRight: function(event) {
    this.$('#footer-left').removeClass('footer-left-show').addClass('footer-left-hide');
    this.$('#footer-right').removeClass('footer-right-hide').addClass('footer-right-show');
  },
  toggleFooterLeft: function(event) {
    this.$('#footer-left').removeClass('footer-left-hide').addClass('footer-left-show');
    this.$('#footer-right').removeClass('footer-right-show').addClass('footer-right-hide');
  },
  toggleFooterUp: function(event) {
    if (this.$('#footer').hasClass('footer-baseline')) {
      this.toggleFooterMid();
    } else if (this.$('#footer').hasClass('footer-mid')) {
      this.toggleFooterFull();
    }
  },
  toggleFooterDown: function(event) {
    if (this.$('#footer').hasClass('footer-full')) {
      this.toggleFooterMid();
    } else if (this.$('#footer').hasClass('footer-mid')) {
      this.toggleFooterBaseline();
    }
  },
  showNewPollForm: function(event) {
    this.$('#poll-title, #poll-description, #poll-id').val('');
    this.toggleFooterRight();
    this.toggleFooterFull();
  },

  showEditPollForm: function(event) {
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    this.$('#poll-title').val(poll.escape('title'));
    this.$('#poll-description').val(poll.escape('description'));
    this.$('#poll-id').val(poll.id + '');
    this.toggleFooterRight();
    this.toggleFooterFull();
  },

  submitPollForm: function(event) {
    event.preventDefault();
    var formData = this.$('#poll-form').serializeJSON();
    var poll = new PollrBear.Models.Poll(formData);
    poll.save({
      success: function() {
        this.collection.set(poll);
        this.$('#poll-title, #poll-description, #poll-id').val('');
        this.toggleFooterLeft();
        this.toggleFooterMid();
      },
      error: function() {
        this.$('#errors-footer').text('Invalid blah blah');
      }
    });
  },

  showDeleteConfirmation: function(event) {
    $(event.currentTarget).find('.delete-confirmation').toggleClass('collapsed');
  },

  submitDelete: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    var objId = $target.attr('data-id');
    var obj = this.collection.getOrFetch(objId);
    var value = "tr[data-id=\'" + objId + "']";
    var $tr = this.$el.find(value);
    obj.destroy();
    $tr.remove();
  },


  //====================================================================


  showPollInfo: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget).find('.poll-info-content');
    $target.removeClass('collapsed');
  },

  hidePollInfo: function(event) {
    event.preventDefault();
    this.$('.poll-info-content').addClass('collapsed');
  },

  showPollReport: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollReport({
      model: poll,
      display: 1
    });
    this._swapView(view);
  },

  showReportIndex: function(event) {
    event.preventDefault();
    var polls = this.collection;
    var view = new PollrBear.Views.PollReport({
      collection: polls,
      display: 2
    });
    this._swapView(view);
  },

  showUserProfile: function(event) {
    event.preventDefault();
    var userId = $(event.currentTarget).attr("data-id");
    var user = new PollrBear.Models.User({
      id: userId
    });
    user.fetch();
    var view = new PollrBear.Views.UserProfile({
      user: user
    });
    this._swapView(view);
  },

  //====================================================================

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$('#container').html(view.$el);
    view.render();
  },

  maybeCreate: function(event) {
    if (event.keyCode === 13) {
      this.create(event);
    }
  },



  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================


  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviews: function () {
    var view = this;
    this.subviews().each(function (selectorSubviews, selector) {
      view.$(selector).empty();
      selectorSubviews.each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  eachSubview: function(callback) {
    this.subviews().each(function (selectorSubviews, selector) {
      selectorSubviews.each(function (subview) {
        callback(subview, selector);
      });
    });
  },

  onRender: function() {
    this.eachSubview(function (subview) {
      subview.onRender && subview.onRender();
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.eachSubview(function (subview) {
      subview.remove();
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var selectorSubviews = this.subviews(selector);
    selectorSubviews.splice(selectorSubviews.indexOf(subview), 1);
  },

  removeModelSubview: function (selector, model) {
    var selectorSubviews = this.subviews(selector);
    var i = selectorSubviews.findIndex(function (subview) {
      return subview.model === model;
    });
    if (i === -1) { return; }

    selectorSubviews.toArray()[i].remove();
    selectorSubviews.splice(i, 1);
  },

  subviews: function (selector) {
    this._subviews = this._subviews || {};

    if (selector) {
      this._subviews[selector] = this._subviews[selector] || _([]);
      return this._subviews[selector];
    } else {
      return _(this._subviews);
    }
  }
});
