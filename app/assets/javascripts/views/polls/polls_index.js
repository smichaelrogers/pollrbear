PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({

  //====================================================================

  template: JST['polls/index'],
  className: 'idx',
  tagName: 'section',
  events: {
    'click .show-poll': 'showPoll',

    'click .toggle-footer-up': 'toggleFooterUp',
    'click .toggle-footer-down': 'toggleFooterDown',
    'click .toggle-footer-left': 'toggleFooterLeft',
    'click .toggle-footer-right': 'toggleFooterRight',

    'click .show-new-poll-form': 'showNewPollForm',
    'click .show-edit-poll-form': 'showEditPollForm',
    'click .submit-new-poll-form': 'submitNewPollForm',
    'click .submit-edit-poll-form': 'submitEditPollForm',
    'click .show-delete-poll-confirmation': 'showDeleteFormConfirmation',
    'click .submit-delete-poll-confirmation': 'submitDeletePollConfirmation',
    'click .show-poll-info': 'showPollInfo',
    'click .show-poll-report': 'showPollReport',
    'click .show-comments': 'showComments',
    'click .submit-comment-form': 'submitCommentForm',
    'click .show-user-profile': 'showUserProfile',
    'click .view-collapse': 'collapse',

    'keydown input': 'maybeCreate'
  },

  //====================================================================

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      polls: this.collection
    });
    this.$el.html(content);
    return this;
  },

  //====================================================================

  showPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    var polls = this.collection;
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: polls
    });
    this._swapView(view);
  },

  //====================================================================


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


  //====================================================================


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

  submitNewPollForm: function(event) {
    event.preventDefault();
    var formData = this.$('#poll-form').serializeJSON();
    this.collection.create(formData, {
      success: function() {
        this.$('#poll-title, #poll-description, #poll-id').val('');
        this.toggleFooterLeft();
        this.toggleFooterMid();
      },
      error: function() {
        this.$('#errors-footer').text('Invalid blah blah');
      }
    });
  },
  submitEditPollForm: function(event) {
    event.preventDefault();
    var formData = this.$('#poll-form').serializeJSON();
    this.collection.save(formData, {
      success: function() {
        this.$('#poll-title, #poll-description, #poll-id').val('');
        this.toggleFooterLeft();
        this.toggleFooterMid();
      },
      error: function() {
        this.$('#errors-footer').text('Invalid blah blah');
      }
    });
  },

  showDeletePollConfirmation: function(event) {
    $(event.currentTarget).find('.delete-poll-confirmation').toggleClass('collapsed');
  },

  submitDeletePollConfirmation: function(event) {
    var $target = $(event.currentTarget);
    var pollId = $target.attr('data-id');
    $(event.currentTarget).find('tr.')/////////////////////////////FINISHED HERE
  }


  //====================================================================


  showPollInfo: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-id');
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
