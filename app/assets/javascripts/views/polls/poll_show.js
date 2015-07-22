PollrBear.Views.PollShow = Backbone.DashboardView.extend({
  template: JST['polls/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.render();
  },
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);

    if (this.model.questions()) {
      this.model.questions().forEach(function(question) {
        var questionView = new PollrBear.Views.QuestionShow({
          model: question
        });
      });
    }

    return this;
  }
});
