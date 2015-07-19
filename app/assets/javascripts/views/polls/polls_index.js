PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  className: 'idx',
  tagName: 'section',
  events: {
    'click .show-poll': 'showPoll',
    'click .show-new-poll-form': 'showNewPollForm',
    'click .submit-new-poll-form': 'submitNewPollForm',
    'click .show-edit-poll-form': 'showEditPollForm',
    'click .submit-edit-poll-form': 'submitEditPollForm',
    'click .show-delete-poll-confirmation': 'showDeleteFormConfirmation',
    'click .submit-delete-poll-confirmation': 'submitDeletePollConfirmation',
    'click .show-poll-info': 'showPollInfo',
    'click .show-poll-report': 'showPollReport',
    'click .show-comment-form': 'showCommentForm',
    'click .submit-comment-form': 'submitCommentForm',
    'click .show-user-profile': 'showUserProfile',
    'click .view-collapse': 'collapse',
    'click .toggle-footer-up': 'toggleFooterUp',
    'click .toggle-footer-down': 'toggleFooterDown',
    'keydown input': 'maybeCreate'
  },

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

  showNewPollForm: function(event) {
    this.$('#footer').attr('class', 'footer-mid');
  },

  submitNewPollForm: function(event) {
    event.preventDefault();
    var formData = this.$('#poll-form').serializeJSON();
    this.collection.create(formData, {
      success: function() {
        this.$('#form-poll').toggleClass('collapsed');
        this.$('input, textarea').val('');
        this.$()
      }
    });
  },

  showEditPollForm: function(event) {
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    this.$('input#poll-title').val(poll.escape('title'));
    this.$('textarea#poll-description').val(poll.escape('description'));
    this.$('input#poll-id').val(poll.id);
    this.$('#form-poll').toggleClass('collapsed');
  },

  submitEditPollForm: function(event) {
    event.preventDefault();
    var formData = this.$('#form-poll').serializeJSON();
    this.collection.set(formData, {
      success: function() {
        console.log('Successfully updated Poll');
        Backbone.history.navigate('', {
          trigger: true
        });
        this.$('input, textarea').text('');
      }
    });
  },

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
      model: poll
    });
    this._swapView(view);
  },

  showReportIndex: function(event) {
    event.preventDefault();
    var polls = this.collection;
    var view = new PollrBear.Views.PollReport({
      collection: polls
    });
    this._swapView(view);
  },

  showCommentForm: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget).find('.poll-comments');
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollComment({
      model: poll
    });
    $target.html(view.render().$el);
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

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$el.html(view.$el);
    view.render();
  },

  collapse: function(event) {
    event.stopPropgation();
    var $(event.currentTarget).toggleClass('collapsed');
  },

  maybeCreate: function(event) {
    if (event.keyCode === 13) {
      this.create(event);
    }
  }

});
