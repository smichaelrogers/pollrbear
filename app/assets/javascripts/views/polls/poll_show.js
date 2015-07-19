PollrBear.Views.PollShow = Backbone.CompositeView.extend({

//====================================================================

  template: JST['polls/show'],
  className: 'content-poll',
  events: {
    'click .show-question': 'showQuestion',
    'click .show-question-info': 'showQuestionInfo',
    'click .show-new-question-form': 'showQuestionForm',
    'click .show-edit-question-form': 'showEditQuestionForm',
    'click .show-delete-question-confirmation': 'showDeleteQuestionConfirmation',
    'click .submit-delete-question-confirmation': 'submitDeleteQuestionConfirmation',
    'click .view-collapse': 'collapse',
    'keydown input': 'maybeCreate'
  },

  //====================================================================

  initialize: function() {
    this.collection = this.model.questions();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    return this;
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
    if(this.$('#footer').hasClass('footer-baseline')) {
      this.toggleFooterMid();
    } else if (this.$('#footer').hasClass('footer-mid')) {
      this.toggleFooterFull();
    }
  },
  toggleFooterDown: function(event) {
    if(this.$('#footer').hasClass('footer-full')) {
      this.toggleFooterMid();
    } else if (this.$('#footer').hasClass('footer-mid')) {
      this.toggleFooterBaseline();
    }
  },

  //====================================================================

  showQuestion: function(event) {
    event.preventDefault();
    var questionId = $(event.currentTarget).attr('data-id');
    var question = this.collection.getOrFetch(questionId);
    var questions = this.collection;
    var view = new PollrBear.Views.QuestionShow({
      model: question,
      collection: questions
    });
    this._swapView(view);
  },
  showQuestionInfo: function(event) {
    event.preventDefault();
    $(event.currentTarget).find('.question-info').toggleClass('collapsed');
  },
  showNewQuestionForm: function(event) {
    event.preventDefault();
    this.$('#show-new-question-form').toggleClass('collapsed');
  },
  showEditQuestionForm: function(event) {
    event.preventDefault();
    var questionContent = this.$(event.currentTarget).find('.question-text');
    this.$('#show-new-question-form .input-question-text').text(questionContent);
    this.$('#show-new-question-form').toggleClass('collapsed');
  }
});

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
  this.$('#poll-title, #poll-description, #poll-id').val('');
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

showEditPollForm: function(event) {
  var pollId = $(event.currentTarget).attr('data-id');
  var poll = this.collection.getOrFetch(pollId);
  this.$('#poll-title').val(poll.escape('title'));
  this.$('#poll-description').val(poll.escape('description'));
  this.$('#poll-id').val(poll.id + '');
  this.toggleFooterRight();
  this.toggleFooterFull();
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
