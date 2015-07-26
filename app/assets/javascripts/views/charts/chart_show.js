PollrBear.Views.ChartShow = Backbone.View.extend({
  template: JST['charts/show'],

  initialize: function(options) {
    this.listenTo(this.collection, 'change', this.render)
    this.delegateChartRendering();
  },

  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  },

  delegateChartRendering: function() {

    switch (this.model.get('chart')) {
      case 1:
        this.renderPieChart();
        break;
      case 2:
        this.renderPolarAreaChart();
        break;
      case 3:
        this.renderBarChart();
        break;
      case 4:
        this.renderRadarChart();
        break;
      case 5:
        this.renderLineChart();
        break;
      default:
        this.renderPieChart();
    };
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
  },

  renderPieChart: function() {
    var element = $("canvas[data-question-id=\"" + this.model.id + "\"]")[0];
    var ctx = element.getContext("2d");
    var pieChartData = [];
    var answerData;
    var i = 0;
    var colors = ["#D93D4A", "#FFC100", "#0DB3D9", "#F29422", "#0367A6", "#929292", "#FCD036"];
    var highlights = ["#da7981", "#ffde75", "#59cde8", "#eca650", "#3281b3", "#b5b5b5", "#ffe483"];
    this.collection.forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.responses().length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlights[i];
      answerData['label'] = answer.get('text');
      pieChartData.push(answerData);
      i++;
    });
    window.chart = new Chart(ctx).Pie(pieChartData);
  },

  renderBarChart: function() {
    var element = $("canvas[data-question-id=\"" + this.model.id + "\"]")[0];
    var ctx = element.getContext("2d");
    var chartData = [];
    var lbls = [];
    this.collection.forEach(function(answer) {
      lbls.push(answer.get('text'));
      chartData.push(answer.responses().length);
    });
    var barChartData = {
      labels: lbls,
      datasets: [{
        fillColor: "rgba(3,103,166, 0.5)",
        strokeColor: "rgba(3,103,166, 0.5)",
        highlightFill: "rgba(3,103,166, 0.5)",
        highlightStroke: "rgba(3,103,166, 0.5))",
        data: chartData
      }]
    }
    window.chart = new Chart(ctx).Bar(barChartData);
  },
  renderRadarChart: function() {
    var element = $("canvas[data-question-id=\"" + this.model.id + "\"]")[0];
    var ctx = element.getContext("2d");
    var chartData = [];
    var lbls = [];
    this.collection.forEach(function(answer) {
      lbls.push(answer.get('text'));
      chartData.push(answer.responses().length);
    });
    var radarChartData = {
      labels: lbls,
      datasets: [{
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: chartData
      }]
    }
    window.chart = new Chart(ctx).Radar(radarChartData);
  },
  renderPolarAreaChart: function() {
    var element = $("canvas[data-question-id=\"" + this.model.id + "\"]")[0];
    var ctx = element.getContext("2d");
    var chartData = [];
    var answerData;
    var i = 0;
    var colors = ["#D93D4A", "#FFC100", "#0DB3D9", "#F29422", "#0367A6", "#929292", "#FCD036"];
    var highlights = ["#da7981", "#ffde75", "#59cde8", "#eca650", "#3281b3", "#b5b5b5", "#ffe483"];
    this.collection.forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.responses().length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlights[i];
      answerData['label'] = answer.get('text');
      chartData.push(answerData);
      i++;
    });
    window.chart = new Chart(ctx).PolarArea(chartData);
  },
  renderLineChart: function() {
    var element = $("canvas[data-question-id=\"" + this.model.id + "\"]")[0];
    var ctx = element.getContext("2d");
    var chartData = [];
    var lbls = [];
    this.collection.forEach(function(answer) {
      lbls.push(answer.get('text'));
      chartData.push(answer.responses().length);
    });
    var lineChartData = {
      labels: lbls,
      datasets: [{
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: chartData
      }]
    }
    window.chart = new Chart(ctx).Line(lineChartData);
  }
});
