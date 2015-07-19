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
    'click .submit-delete-confirmation': 'submitDeleteConfirmation',
    'click .show-poll-info': 'showPollInfo',
    'click .show-poll-report': 'showPollReport',
    'click .show-comments': 'showComments',
    'click .submit-comment': 'submitCommentForm',
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
    var $target = $(event.currentTarget).find('.show-poll-info');
    $target.toggleClass('collapsed');
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

  submitComment: function(event) {
    event.preventDefault();
    var formData = this.$('#comment-input');
    var pollId = this.$('#current-poll');
    var poll = PollrBear.Collections.polls.getOrFetch(pollId);
    poll.create(formData,{
      success: function() {
        this.$('#comment-input').val('');
        this.toggleFooterMid();
      },
      error: function() {
        this.$('#errors-footer').text('Invalid comment');
      }
    });
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
  }
});
