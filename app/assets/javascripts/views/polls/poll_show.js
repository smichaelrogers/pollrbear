PollrBear.Views.PollShow = Backbone.View.extend({
  template: JST['polls/show'],
  initialize: function() {
    this.collection = this.model.questions();
    this.collection.fetch();
    this.listenToOnce(this.model, 'sync', this.render);
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
      collection: this.collection
    });
    $("#questions").html(view.render().$el);
  }
});
