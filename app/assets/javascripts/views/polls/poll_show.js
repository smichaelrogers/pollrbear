PollrBear.Views.PollShow = Backbone.View.extend({
  template: JST['polls/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
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
      model: this.model
    });
    $("#questions").html(view.render().$el);
  }
});
