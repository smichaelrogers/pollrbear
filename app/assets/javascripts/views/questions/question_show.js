PollrBear.Views.QuestionShow = Backbone.DashboardView.extend({

  template: JST['questions/show'],

  initialize: function() {
    this.render();
    this.ctx = this.$(".chart-area").get(0).getContext("2d");
  },
  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  },
  pieChart: function() {
    var that = this;
    var chartData = [];
    var answerData;
    var i = 0;
    var colors = ["#AAAAAA", "#BBBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"];
    var highlights = ["#AAAAAA", "#BBBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"];
    question.answers().forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.responses().length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlight[i];
      answerData['labels'] = answer.get('text');
      chartData.push(answerData);
      i++;
    });

    var pie = new Chart(that.ctx[0]).Pie(chartData);
  },
  lineChart: function() {

  },
  barChart: function() {

  },
  radarChart: function() {

  },
  polarAreaChart: function() {

  },


  window.onload = function() {

  };



  < /script> < /body > < /html>


  generateData: function() {
    var data = [];
    if (this.model.answers()) {

      this.model.answers().forEach(function(answer) {
        var obj = {
          value: answer.responses().length,
          color: "#333333",
          highlight: "#ED503D",
          label: answer.get('text')
        };
        data.push(obj);
      });
    };
    return data;
  },

  renderPieChart: function() {
    var canvas = this.$('canvas');
    var data = this.generateData();
    var ctx = this.$el.get(0).getContext("2d");
    var options = {};
    var chart = new Chart(ctx).Pie(data, options);
    return this;
  }
});
