PollrBear.Views.PollsIndex = Backbone.DashboardView.extend({
  template: JST['polls/index'],
  events: {
    'click button.a-questions-show': 'showQuestions',
    'click button.visitor-submit-form': 'submitForm',
    'click button.a-poll-destroy': 'destroyPoll',
    'click button.a-poll-report': 'showReport',
    'click button.a-poll-ignore': 'ignorePoll'
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
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

  showQuestions: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr('data-poll-id');
    var poll = this.collection.getOrFetch(pollId);
    var questions = poll.questions();
    var view = new PollrBear.Views.QuestionsIndex({
      collection: questions,
      model: poll
    });
    this._swapView(view);
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
