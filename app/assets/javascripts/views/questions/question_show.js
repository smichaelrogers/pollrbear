PollrBear.Views.QuestionShow = Backbone.DashboardView.extend({

  template: JST['questions/show'],

  events: {
    'click .add-answer': 'addAnswer',
    'click .delete-answer': 'deleteAnswer',
    'click .select-chart': 'selectChart',
    'click .delete-chart': 'deleteChart'
  },

  initialize: function() {
    this.collection = this.model.answers();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function() {
    var content = this.template({
      poll: this.model,
      questions: this.collection
    });
    this.$el.html(content);
    return this;
  },

  //====================================================================

  addAnswer: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).find('#answer-form').serializeJSON();
    this.collection.create(formData, {
      success: function() {
        this.$('#success-header').text('success');
      },
      error: function() {
        this.$('#errors-header').text('invalid answer');
      }
    });
  },
  deleteAnswer: function(event) {
    event.preventDefault();
    var answerId = $(event.currentTarget).attr('data-id');
    var answer = this.collection.getOrFetch(answerId);
    answer.destroy();
  },
  selectChart: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).find('#chart-form').serializeJSON();
    this.model.charts().create(formData, {
      success: function() {
        this.$('#success-header').text('success');
      },
      error: function() {
        this.$('#errors-header').text('invalid chart');
      }
    });
  },
  deleteChart: function(event) {
    event.preventDefault();
    this.model.noChart();
  }
});