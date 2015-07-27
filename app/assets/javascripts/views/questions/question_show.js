PollrBear.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],

  initialize: function(options) {
    window.setTimeout(function() {
      this.listenTo(this.model, 'sync', this.render);
      this.renderAnswers();
    }.bind(this), 1000);
  },

  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  },

  renderChart: function() {
    var view = new PollrBear.Views.ChartShow({
      collection: this.collection
    });
    $("#chart").html(view.render().$el);
  },

  renderAnswers: function() {
    var view = new PollrBear.Views.AnswersIndex({
      model: this.model
    });
    $("#answers").html(view.render().$el);
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
});
