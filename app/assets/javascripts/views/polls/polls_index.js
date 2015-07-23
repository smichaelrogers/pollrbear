PollrBear.Views.PollsIndex = Backbone.DashboardView.extend({
  template: JST['polls/index'],
  events: {
    'click button.btn-questions-show': 'showQuestions',
    'click button.visitor-submit-form': 'submitForm',
    'click button.btn-poll-edit': 'editPoll',
    'click button.btn-poll-destroy': 'destroyPoll',
    'click button.btn-poll-report': 'showReport',
    'click button.btn-poll-ignore': 'ignorePoll'
  },
  initialize: function() {
    this.collection.fetch();
  },
  render: function() {
    var content = this.template({
      polls: this.collection
    });
    this.$el.html(content);
    return this;
  },

  submitForm: function(event) {
    event.preventDefault();
    var that = this;
    var pollId = $(event.currentTarget).attr("data-poll-id");
    var poll = PollrBear.currentUser.polls().getOrFetch(pollId);
    var $checked = this.$("input:checked");
    $checked.each(function(index, value) {
      PollrBear.currentUser.responses().create({
        answer_id: value.value,
        user_id: PollrBear.currentUser.id
      });
    });

    window.setTimeout(function() {
      that.render();
    }, 100);

  },

  showPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-poll-id');
    var poll = this.collection.getOrFetch(pollId);
    var $target = this.$("ul[data-poll-id=\"" + pollId + "\"]");
    if ($target.hasClass("collapsed")) {
      var view = new PollrBear.Views.QuestionsIndex({
        collection: poll.questions()
      });
      $target.removeClass('collapsed');
    } else {
      $target.addClass('collapsed');
    };
  },

  showQuestions: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-poll-id');
    var poll = this.collection.getOrFetch(pollId);
    var $target = this.$("div[data-poll-id=\"" + pollId + "\"]");
    var view = new PollrBear.Views.QuestionsIndex({
      collection: poll.questions()
    });
    $target.html(view.render().$el);
  },

  editPoll: function(event) {
    event.preventDefault();
    alert('tbd');

  },

  destroyPoll: function(event) {
    event.preventDefault();
    alert('tbd');
  },
  showReport: function(event) {
    event.preventDefault();
    alert('tbd');
  },

  ignorePoll: function(event) {
    event.preventDefault();
    alert('tbd');
  }
});
