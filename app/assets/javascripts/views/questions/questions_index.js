PollrBear.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],
  events: {
    "click .select-question": "selectQuestion"
  },
  initialize: function() {
    this.trigger('add');
  },
  render: function() {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    return this;
  },
  selectQuestion: function(event) {
    event.preventDefault();
    var questionId = $(event.currentTarget).attr("data-question-id");
    var question = this.collection.get(questionId);
    var view = new PollrBear.Views.QuestionShow({
      model: question
    });
    $("#questions").addClass("questions-collapsed");
    $("#panel-chart").removeClass("panel-hidden");
    $("#chart-area").removeClass("chart-area-hidden").addClass("chart-area-expanded");
    $("#show-question").html(view.render().$el);
  }
});
