PollrBear.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    this.renderAnswers();
    return this;
  },

  renderChart: function() {
    var view = new PollrBear.Views.ChartShow({
      model: this.model
    });
    this.$(".chart").html(view.render().$el);
  },

  renderAnswers: function() {
    var view = new PollrBear.Views.AnswersIndex({
      model: this.model
    });
    this.$(".answers").html(view.render().$el);
  },

  percentages: function() {
    var data = [];
    var num;
    var len = 0;
    this.collection.forEach(function(answer) {
      len += answer.responses().length;
    });
    this.collection.forEach(function(answer) {
      num = (answer.responses().length / len) * 100
      data.push(Math.floor(num) + "%");
    });
    return data;
  }
}
