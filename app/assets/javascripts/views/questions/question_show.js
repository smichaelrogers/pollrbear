PollrBear.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],
  initialize: function() {
    this.trigger('sync');
    this.collection = this.model.answers();
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
      collection: this.collection
    });
    $("#chart").html(view.render().$el);
  },

  renderAnswers: function() {
    var view = new PollrBear.Views.AnswersIndex({
      collection: this.collection
    });
    this.addSubview("#answers", view);
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
