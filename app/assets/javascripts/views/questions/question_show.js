PollrBear.Views.QuestionShow = Backbone.DashboardView.extend({
  template: JST['questions/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.render();
  },

  render: function() {
    var percentages = this.percentages();
    var content = this.template({
      question: this.model,
      percentages: percentages
    });
    this.$el.html(content);
    window.setTimeout(function() {
      this.renderPieChart();
    }.bind(this), 50);
    return this;
  },

  delegateChart: function() {
    switch (this.model.get('chart_type')) {
      case 1:
        this.renderPieChart();
      break;
      case 2:
        this.renderLineChart();
      break;
      case 3:
        this.renderBarChart();
      break;
      case 4:
        this.renderRadarChart();
      break;
      case 5:
        this.renderPolarAreaChart();
      break;
      default:
        this.renderPieChart();
    };
  },


  percentages: function() {
    var data = [];
    var num;
    var len = 0;
    this.model.answers().forEach(function(answer) {
      len += answer.responses().length;
    });
    this.model.answers().forEach(function(answer) {
      num = answer.responses().length / len;
      data.push(num);
    });
    return data;
  },

  renderPieChart: function() {
    var element = $("canvas[data-question-id=\"" + this.model.id + "\"]")[0];
    var ctx = element.getContext("2d");
    var chartData = [];
    var answerData;
    var i = 0;
    var colors = ["#AAAAAA", "#BBBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"];
    var highlights = ["#AAAAAA", "#BBBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"];
    this.model.answers().forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.responses().length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlights[i];
      answerData['labels'] = answer.get('text');
      chartData.push(answerData);
      i++;
    });

    window.chart = new Chart(ctx).Pie(chartData);
  },


  renderLineChart: function() {

  },
  renderBarChart: function() {

  },
  renderRadarChart: function() {

  },
  renderPolarAreaChart: function() {

  }
});
