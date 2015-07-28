PollrBear.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],
  initialize: function() {

    this.collection = this.model.attributes.answers;
    this.trigger('add');
  },
  render: function() {
    var content = this.template({
      question: this.model,
      answers: this.collection,
      percentages: this.percentages()
    });
    this.$el.html(content);
    this.renderChart();
    return this;
  },

  renderChart: function() {
    var view = new PollrBear.Views.QuestionChart({
      model: this.model,
      collection: this.collection
    });
  },

  percentages: function() {
    var data = [];
    var num;
    var len = 0;
    this.collection.forEach(function(answer) {
      len += answer.responses.length;
    });
    this.collection.forEach(function(answer) {
      num = (answer.responses.length / len) * 100
      data.push(Math.floor(num) + "%");
    });
    return data;
  },
});
