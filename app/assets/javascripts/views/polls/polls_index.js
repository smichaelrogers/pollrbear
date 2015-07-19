PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  className: 'idx-polls',
  tagName: 'section',
  events: {
    'click .show-poll-idx': 'showPollIdx',
    'click .show-new-poll-form': 'showNewPollForm',
    'click .submit-new-poll-form': 'submitNewPollForm',
    'click .show-poll-info': 'showPollInfo',
    'click .show-poll-report': 'showPollReport',
    'click .show-user-profile': 'showUserProfile',
    'click .close': 'collapse',
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
  showPollIdx: function(event) {
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
    var polls = this.collection;
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: polls
    });
    var div = "div[data-id='" + pollId + "']";
    this.addSubview('#reports', view);
  },

  // clear content
  showReportIndex: function(event) {
    event.preventDefault();
    var polls = this.collection;
    var view = new PollrBear.Views.PollShow({
      collection: polls
    });
    this.addSubview('#reports', view);
  },

  collapse: function(event) {},


  maybeCreate: function(event) {
    if (event.keyCode === 13) {
      this.create(event);
    }

  }

});
