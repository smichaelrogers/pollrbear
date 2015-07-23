PollrBear.Views.AnswersIndex = Backbone.DashboardView.extend({
  template: JST['answers/index'],
  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      answers: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
