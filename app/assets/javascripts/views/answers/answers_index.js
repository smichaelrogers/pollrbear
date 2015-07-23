PollrBear.Views.AnswersIndex = Backbone.DashboardView.extend({
  template: JST['answers/index'],
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.fetch();
  },
  render: function() {
    var content = this.template({
      answers: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
