PollrBear.Views.PollShow = Backbone.CompositeView.extend({
  template: JST['polls/show'],
  events: {
    'click .answer-select': 'selectAnswer',
    'click .go-back': 'goBack'
  },
  initialize: function() {
    this.collection = this.model.answers();
    this.listenTo(this.collection, 'add', this.render);
    this.colors = ["rgb(112, 202, 200)", "rgb(252, 109, 100)", "rgb(93, 201, 240)", "rgb(247, 210, 84)", "rgb(170, 216, 114)"];
    this.userResponse;
    this.majorityResponse;
  },
  render: function() {
    var content = this.template({
      poll: this.model,
      answers: this.collection,
      percentages: this.percentages()
    });
    this.$el.html(content);
    return this;
  },

  goBack: function(event) {
    event.preventDefault();
    var view = new PollrBear.Views.PollsIndex({
      collection: PollrBear.currentUser.polls()
    })
    this._swapMainView(view);
  },

  selectAnswer: function(event) {
    event.preventDefault();
    var userId = PollrBear.currentUser.id;
    var answerId = $(event.currentTarget).attr("data-answer-id");
    var answer = this.collection.getOrFetch(answerId);
    answer.responses().create({
      respondent_id: userId,
      answer_id: answerId
    });
    $("#answers").addClass("form-collapsed");
    $("#results").removeClass("form-collapsed");
    this.delegateChartRendering();
    var respStr = "";
    this.$(".user-details").text("");
  },

  percentageChosen: function(answerId) {
    var answer = this.collection.get(answerId);
    var numResp = answer.responses().length;
    return Math.floor(numResp / this.totalVotes());
  },

  mostChosen: function() {

  },

  percentages: function() {
    var data = [];
    var len = this.totalVotes();
    var num;
    this.collection.forEach(function(answer) {
      num = (answer.attributes.responses.length / len) * 100
      data.push(Math.floor(num) + " %");
    });
    return data;
  },

  totalVotes: function() {
    var len = 0;
    this.collection.forEach(function(answer) {
      len += answer.attributes.responses.length;
    });
    return len;
  },

  delegateChartRendering: function() {
    switch (this.model.attributes.chart) {
      case 1:
        this.renderPieChart();
        break;
      case 2:
        this.renderBarChart();
        break;
      case 3:
        this.renderLineChart();
        break;
      case 4:
        this.renderPolarAreaChart();
        break;
      default:
        this.renderPieChart();
    };
  },

  renderPieChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var pieChartData = [];
    var answerData;
    var i = 0;
    var colors = this.colors;
    var highlights = this.colors;
    this.collection.forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.attributes.responses.length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlights[i];
      answerData['label'] = answer.attributes.text;
      pieChartData.push(answerData);
      i++;
    });


    var chart = new Chart(ctx).Pie(pieChartData);

  },

  renderBarChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    var lbls = [];
    $("#canvas-holder").css("background: rgb(112, 202, 200);");
    this.collection.forEach(function(answer) {
      lbls.push(answer.attributes.text);
      chartData.push(answer.attributes.responses.length);
    });
    var barChartData = {
      labels: lbls,
      datasets: [{
        fillColor: "rgb(112, 202, 200)",
        strokeColor: "rgb(112, 202, 200)",
        highlightFill: "rgb(112, 202, 200)",
        highlightStroke: "rgb(112, 202, 200)",
        data: chartData
      }]
    }


    var chart = new Chart(ctx).Bar(barChartData, this.barChartOptions);

  },
  renderRadarChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    var lbls = [];
    this.collection.forEach(function(answer) {
      lbls.push(answer.attributes.text);
      chartData.push(answer.attributes.responses.length);
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


    var chart = new Chart(ctx).Radar(radarChartData);

  },
  renderPolarAreaChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    var answerData;
    var i = 0;
    var colors = ["#D93D4A", "#FFC100", "#0DB3D9", "#F29422", "#0367A6", "#929292", "#FCD036"];
    var highlights = ["#da7981", "#ffde75", "#59cde8", "#eca650", "#3281b3", "#b5b5b5", "#ffe483"];
    this.collection.forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.attributes.responses.length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlights[i];
      answerData['label'] = answer.attributes.text;
      chartData.push(answerData);
      i++;
    });


    var chart = new Chart(ctx).PolarArea(chartData);

  },
  renderLineChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    var lbls = [];
    this.collection.forEach(function(answer) {
      lbls.push(answer.attributes.text);
      chartData.push(answer.attributes.responses.length);
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
    var chart = new Chart(ctx).Line(lineChartData);
  },

  barChartOptions: {
    scaleBeginAtZero: true,
    scaleShowGridLines: false,
    scaleGridLineColor: "rgba(255,255,255,0)",
    scaleGridLineWidth: 0,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    barShowStroke: true,
    barStrokeWidth: 2,
    barValueSpacing: 5,
    barDatasetSpacing: 1,
  }


});
