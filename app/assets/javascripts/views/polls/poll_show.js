PollrBear.Views.PollShow = Backbone.DashboardView.extend({

  template: JST['polls/show'],

  events: {
    'click .show-question': 'showQuestion',
    'click .show-question-info': 'showQuestionInfo',
    'click .show-new-question-form': 'showQuestionForm',
    'click .show-edit-question-form': 'showEditQuestionForm',
    'click .submit-question-form': 'submitQuestionForm',
    'click .show-invite-form': 'showInviteForm',
    'click .send-invite': 'sendInvite'
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
  showQuestion: function(event) {
    event.preventDefault();
    var questionId = $(event.currentTarget).attr('data-id');
    var question = this.collection.getOrFetch(questionId);
    var view = new PollrBear.Views.QuestionShow({
      model: question,
      collection: questions
    });
    $(event.currentTarget).find('.question-content').html(view.render().$el);
  },
  hideQuestion: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget).find('question-content');
    $target.remove();
  },
  showQuestionInfo: function(event) {
    event.preventDefault();
    $(event.currentTarget).find('.question-info').toggleClass('collapsed');
  },
  showNewQuestionForm: function(event) {
    event.preventDefault();
    this.$('#question-form').toggleClass('collapsed');
  },
  showEditQuestionForm: function(event) {
    event.preventDefault();
    var questionContent = this.$(event.currentTarget).find('.question-text');
    this.$('#question-form-text').text(questionContent);
    this.$('#question-form').toggleClass('collapsed');
  },
  submitQuestionForm: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).find('.question-form').serializeJSON();
    var question = new PollrBear.Models.Question(formData);
    question.save({
      success: function() {
        this.collection.set(question);
        $(event.currentTarget).val('');
        this.$('#question-form-text').val('');
        this.$('#queston-form').toggleClass('collapsed');
      },
      error: function() {

      }
    });
  }


});