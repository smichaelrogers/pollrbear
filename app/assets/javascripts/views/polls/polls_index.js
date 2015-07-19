PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  className: 'idx',
  tagName: 'section',
  events: {
    'click .show-poll': 'showPollIdx',
    'click .show-new-poll-form': 'showNewPollForm',
    'click .submit-new-poll-form': 'submitNewPollForm',
    'click .show-edit-poll-form': 'showEditPollForm',
    'click .submit-edit-poll-form': 'submitEditPollForm',
    'click .show-poll-info': 'showPollInfo',
    'click .show-poll-report': 'showPollReport',
    'click .show-user-profile': 'showUserProfile',
    'click .view-collapse': 'collapse',
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

  // delegate PRIVATE or PUBLIC or INIVTED
  showPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    var polls = this.collection;
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: polls
    });
    var div = "div[data-id='" + pollId + "']";
    this.addSubview(div, view);
  },

  showNewPollForm: function(event) {
    this.$('.form-poll').toggleClass('collapsed');
  },

  // formData: user_id, title, text, privacy(1,2,3)
  submitNewPollForm: function(event) {
    event.preventDefault();
    var formData = this.$('.poll-form').serializeJSON();
    this.collection.create(formData, {
      success: function() {
        console.log('Successfully created new Poll');
        Backbone.history.navigate('', {
          trigger: true
        });
      }
    });
  },

  showEditPollForm: function(event) {
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    this.$('.form-poll input.poll-title').text(poll.escape('title'));
    this.$('.form-poll textarea').text(poll.escape('description'));
    this.$('.form-poll input.poll-id').text(poll.id);
    this.$('.form-poll').toggleClass('collapsed');
  },

  // formData: user_id, title, text, privacy(1,2,3)
  submitEditPollForm: function(event) {
    event.preventDefault();
    var formData = this.$('.poll-form').serializeJSON();
    this.collection.set(formData, {
      success: function() {
        console.log('Successfully updated Poll');
        Backbone.history.navigate('', {
          trigger: true
        });
        this.$('.form-poll input, .form-poll textarea').text('');
      }
    });
  },

  // display private/public/invited/friends participating
  showPollInfo: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    this.$("div[data-id='" + pollId + "']").toggleClass('collapsed');
  },

  // clear content
  // delegate PRIVATE or PUBLIC/INVITED
  showPollReport: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-id');
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollReport({
      model: poll
    });
    this.$el.html(view);
  },

  // clear content
  showReportIndex: function(event) {
    event.preventDefault();
    var polls = this.collection;
    var view = new PollrBear.Views.PollReport({
      collection: polls
    });
    this.$el.html(view);
  },

  // will be same action for current user or others,
  // depends on privacy, and who user is, to edit etc
  // same as polls
  showUserProfile: function(event) {
    event.preventDefault();
    var userId = $(event.currentTarget).attr("data-id");
    var user = new PollrBear.Models.User({
      id: userId
    });
    var view = new PollrBear.Views.UserProfile({
      user: user
    });
    this.$el.html(view);
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
