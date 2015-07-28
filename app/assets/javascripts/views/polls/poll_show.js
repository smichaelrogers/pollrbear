PollrBear.Views.PollShow = Backbone.CompositeView.extend({
  template: JST['polls/show'],
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    this.renderQuestions();
    return this;
  },
  renderQuestions: function() {
    var view = new PollrBear.Views.QuestionsIndex({
      model: this.model,
      collection: this.model.questions()
    });
    this.addSubview("#questions", view);
  }
});
