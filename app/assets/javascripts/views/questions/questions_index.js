PollrBear.Views.QuestionsIndex = Backbone.DashboardView.extend({
  template: JST['questions/index'],
  events: {
    'click .show-question': 'showQuestion'
  },
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.fetch();
  },
  render: function() {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    return this;
  },
  showPoll: function(event) {
    event.preventDefault();

    var question = this.collection.getOrFetch($(event.currentTarget).attr('data-id'));

    var view = new PollrBear.Views.QuestionShow({
      model: question
    });

    $('#show-poll').html(view.render().$el);
  }
});
