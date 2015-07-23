PollrBear.Views.QuestionsIndex = Backbone.DashboardView.extend({
  template: JST['questions/index'],
  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      questions: this.collection,
      pollId: this.collection.poll.id
    });
    this.$el.html(content);
    return this;
  }
});
