PollrBear.Views.QuestionShow = Backbone.DashboardView.extend({

  template: JST['questions/show'],

  events: {
  },

  initialize: function() {
    this.collection = this.model.answers();
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  }
});
