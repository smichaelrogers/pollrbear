PollrBear.Views.PollShow = Backbone.CompositeView.extend({
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
  showQuestion: function(event) {
    event.preventDefault();
    var questionId = $(event.currentTarget).attr('data-id');
    var question = this.collection.getOrFetch(pollId);
    var questions = this.collection;
    var view = new PollrBear.Views.QuestionShow({
      model: question,
      collection: questions
    });
    this.$('#show-question').html(view.render().$el);
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
