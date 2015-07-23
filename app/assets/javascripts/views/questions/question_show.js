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
      this.delegateChart();
    }.bind(this), 50);
    return this;
  },

  delegateChart: function() {
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
      num = (answer.responses().length / len).toString();
      data.push(num.slice(0,3));
    });
    return data;
  },

  renderPieChart: function() {
    var element = $("canvas[data-question-id=\"" + this.model.id + "\"]")[0];
    var ctx = element.getContext("2d");
    var pieChartData = [];
    var answerData;
    var i = 0;
    var colors = ["#FDF1CC", "#C6D6B8", "#987F69", "#E3AD40", "#FCD036", "#D93D4A", "#FFC100", "#929292", "#0DB3D9", "#F29422", "#0367A6"];
    var highlights = ["#555555", "#666666", "#777777", "#888888", "#999999", "#444444"];
    this.model.answers().forEach(function(answer) {
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
    this.model.answers().forEach(function(answer) {
      lbls.push(answer.get('text'));
      chartData.push(answer.responses().length);
    });
    var barChartData = {
      labels: lbls,
      datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
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
    this.model.answers().forEach(function(answer) {
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
    var colors = ["#FDF1CC", "#C6D6B8", "#987F69", "#E3AD40", "#FCD036", "#D93D4A", "#FFC100", "#929292", "#0DB3D9", "#F29422", "#0367A6"];
    var highlights = ["#555555", "#666666", "#777777", "#888888", "#999999", "#444444"];
    this.model.answers().forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.responses().length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlights[i];
      answerData['label'] = answer.get('text');
      chartData.push(answerData);
      i++;
    });
    window.chart = new Chart(ctx).PolarArea(chartData, {
      responsive: true
    });
  }
});
