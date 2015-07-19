PollrBear.Views.PollShow = Backbone.DashboardView.extend({

  template: JST['polls/show'],

  buttonGroups: {
    'moderator': '
    <button class=\"btn btn-default show-edit-question-form\" data-id=\"<%= question.id %>\">Edit</button>
    <button class=\"btn btn-default show-delete-confirmation\" data-id=\"<%= question.id %>\">Delete</button>',
    'visitor': '
    <button class=\"btn btn-default show-question-form\" data-id=\"<%= question.id %>\">Answer</button>'
  },

  events: {
    'click .show-question': 'showQuestion',
    'click .hide-question': 'hideQuestion',
    'click .show-question-info': 'showQuestionInfo',
    'click .hide-question-info': 'hideQuestionInfo',
    'click .show-question-form': 'showQuestionForm',
    'click .hide-question-form': 'hideQuestionForm',
    'click .show-edit-question-form': 'showEditQuestionForm',
    'click .toggle-question-form': 'toggleQuestionForm',
    'click .submit-question-form': 'submitQuestionForm'
  },

  //====================================================================

  initialize: function() {
    this.collection = this.model.questions();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function() {
    var access = this.delegateAccess();
    var content = this.template({
      poll: this.model,
      questions: this.collection,
      moderator: access
    });
    this.$el.html(content);
    return this;
  },

  delegateAccess: function() {
    var status = false;
    var userId = this.model.get('user_id');
    $.ajax({
      url: '/session',
      type: 'get',
      success: function(data) {
         if ( data['current_user_id'] === userId ){
           status = true;
         }
      }
    });
    return status;
  },

  //====================================================================

  showQuestion: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget).find('.question-content');
    $(event.target).removeClass('collapsed');
    var questionId = $(event.currentTarget).attr('data-id');
    var question = this.collection.getOrFetch(questionId);
    var view = new PollrBear.Views.QuestionsIndex({
      model: question // in a td-colspan 4
    });
    $target.html(view.render().$el);
  },
  hideQuestion: function(event) {
    event.preventDefault();
    this.$('.show-question').addClass('collapsed');
    var $target = $(event.currentTarget).find('.question-content');
    $target.remove();
  },
  showQuestionInfo: function(event) {
    event.preventDefault();
    $(event.currentTarget).find('.question-info').toggleClass('collapsed');
  },
  hideQuestionInfo: function(event) {
    event.preventDefault();
    $(event.currentTarget).find('.question-info').toggleClass('collapsed');
  },
  showQuestionForm: function(event) {
    event.preventDefault();
    this.$('#question-form').removeClass('collapsed');
  },
  hideQuestionForm: function(event) {
    event.preventDefault();
    this.$('#question-form').addClass('collapsed');
  },
  toggleQuestionForm: function(event) {
    event.preventDefault();
    this.$('#question-form').toggleClass('collapsed');
  },
  showEditQuestionForm: function(event) {
    event.preventDefault();
    var questionContent = $(event.currentTarget).find('.question-text');
    this.$('#question-form-text').text(questionContent);
    this.$('#question-form').removeClass('collapsed');
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
        this.$('#errors-header').text('invalid kajsod header');
      }
    });
  }
});
