PollrBear.Views.PollResults = Backbone.CompositeView.extend({
  template: JST['polls/results'],
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.delegateChartRendering);
    this.colors = [
      "rgba(255,255,255, 0.10)",
      "rgba(255,255,255, 0.60)",
      "rgba(255,255,255, 0.30)",
      "rgba(255,255,255, 0.40)",
      "rgba(255,255,255, 0.50)",
      "rgba(255,255,255, 0.20)"
    ];
    this.highlights = [
      "rgba(255,255,255, 1)",
      "rgba(255,255,255, 1)",
      "rgba(255,255,255, 1)",
      "rgba(255,255,255, 1)",
      "rgba(255,255,255, 1)",
      "rgba(255,255,255, 1)"
    ];
    this.labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
    this.userResponse;
    this.majorityResponse;
  },
  render: function() {
    var content = this.template({
      poll: this.model,
      answers: this.collection,
      percentages: this.percentages(),
      labels: this.labels
    });
    this.$el.html(content);
    this.delegateChartRendering();
    return this;
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
    $(".allow-realign").removeClass("overlay-collapsed");
    window.setTimeout(function() {
      $("#results").removeClass("form-collapsed");
      $(".allow-realign").addClass("overlay-collapsed");
      this.delegateChartRendering();
    }.bind(this), 500);
  },

  percentageChosen: function(answerId) {
    var answer = this.collection.get(answerId);
    var numResp = answer.attributes.responses.length;
    return Math.floor(numResp / this.totalVotes());
  },

  mostChosen: function() {

  },

  percentages: function() {
    var data = [];
    var len = this.totalVotes();
    var num;
    this.collection.forEach(function(answer) {
      if (answer.attributes.responses) {
        num = (answer.attributes.responses.length / len) * 100
        data.push(Math.floor(num) + "");
      }
    });
    return data;
  },

  totalVotes: function() {
    var len = 0;
    this.collection.forEach(function(answer) {
      if(answer.attributes.responses) {
        len += answer.attributes.responses.length;
      }
    });
    return len;
  },

  delegateChartRendering: function() {
    switch (this.model.attributes.chart) {
      case 0:
        break;
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
      case 5:
        this.renderWordCloud();
        break;
      default:
        return;
    };
  },

  renderWordCloud: function() {
    // each response, select words, thread thru api of naughty words, filter, set css values according to rate of occurance, apply transforms

  },

  renderPieChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var answerData, pieChartData = [], i = 0;
    this.collection.forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.attributes.responses.length;
      answerData['color'] = this.colors[i];
      answerData['highlight'] = this.highlights[i];
      answerData['label'] = this.labels[i];
      pieChartData.push(answerData);
      i++;
    }.bind(this));
    var chart = new Chart(ctx).Pie(pieChartData);
  },

  renderBarChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    this.collection.forEach(function(answer) {
      chartData.push(answer.attributes.responses.length);
    });
    var barChartData = {
      labels: this.labels.slice(0, this.collection.length),
      datasets: [{
        fillColor: "rgb(255,255,255)",
        strokeColor: "rgb(255,255,255)",
        highlightFill: "rgba(255,255,255,.3)",
        highlightStroke: "rgba(255,255,255,.3)",
        data: chartData
      }]
    }


    var chart = new Chart(ctx).Bar(barChartData, this.barChartOptions);
  },
  renderRadarChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    this.collection.forEach(function(answer) {
      chartData.push(answer.attributes.responses.length);
    });
    var radarChartData = {
      labels: this.labels,
      datasets: [{
        fillColor: "rgb(255,255,255)",
        strokeColor: "rgb(255,255,255)",
        pointColor: "rgb(255,255,255)",
        pointStrokeColor: "rgb(255,255,255)",
        pointHighlightFill: "rgb(255,255,255)",
        pointHighlightStroke: "rgb(255,255,255)",
        data: chartData
      }]
    }


    var chart = new Chart(ctx).Radar(radarChartData, this.radarChartOptions);

  },
  renderPolarAreaChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    var answerData;
    var i = 0;
    this.collection.forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.attributes.responses.length;
      answerData['color'] = this.colors[i];
      answerData['highlight'] = this.highlights[i];
      answerData['label'] = this.labels[i];
      chartData.push(answerData);
      i++;
    }.bind(this));
    var chart = new Chart(ctx).PolarArea(chartData, this.polarAreaChartOptions);

  },
  renderLineChart: function() {
    var ctx = $("#chart")[0].getContext("2d");
    var chartData = [];
    this.collection.forEach(function(answer) {
      chartData.push(answer.attributes.responses.length);
    });
    var lineChartData = {
      labels: this.labels.slice(0, this.collection.length),
      datasets: [{
        fillColor: "rgba(255,255,255, 0)",
        strokeColor: "rgba(255,255,255, .8)",
        pointColor: "rgba(255,255,255, .8)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: chartData
      }]
    }
    var chart = new Chart(ctx).Line(lineChartData, this.lineChartOptions);
  },

  barChartOptions: {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(255,255,255,0.2)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke: true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth: 1,

    //Number - Spacing between each of the X value sets
    barValueSpacing: 10,

    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  },


  lineChartOptions: {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(255,255,255,0.2)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve: true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 3,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 1,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,


    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  },

  polarAreaChartOptions: {
    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop: false,

    //String - The colour of the label backdrop
    scaleBackdropColor: "rgba(255,255,255,0)",

    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero: true,

    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY: 3,

    //Number - The backdrop padding to the side of the label in pixels
    scaleBackdropPaddingX: 5,

    //Boolean - Show line for each value in the scale
    scaleShowLine: true,

    //Boolean - Stroke a line around each segment in the chart
    segmentShowStroke: true,

    //String - The colour of the stroke on each segement.
    segmentStrokeColor: "rgba(255,255,255,1)",

    //Number - The width of the stroke value in pixels
    segmentStrokeWidth: 1,

    //Number - Amount of animation steps
    animationSteps: 100,

    //String - Animation easing effect.
    animationEasing: "easeOutBounce",

    //Boolean - Whether to animate the rotation of the chart
    animateRotate: true,

    //Boolean - Whether to animate scaling the chart from the centre
    animateScale: true,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  },

  pieChartOptions: {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,

    //String - The colour of each segment stroke
    segmentStrokeColor: "rgba(255,255,255,1)",

    //Number - The width of each segment stroke
    segmentStrokeWidth: 1,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 0, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps: 100,

    //String - Animation easing effect
    animationEasing: "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: true,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  },

  radarChartOptions: {
    //Boolean - Whether to show lines for each scale point
    scaleShowLine: true,

    //Boolean - Whether we show the angle lines out of the radar
    angleShowLineOut: true,

    //Boolean - Whether to show labels on the scale
    scaleShowLabels: false,

    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero: true,

    //String - Colour of the angle line
    angleLineColor: "rgba(255,255,255, 0.9)",

    //Number - Pixel width of the angle line
    angleLineWidth: 1,

    //String - Point label font declaration
    pointLabelFontFamily: "'Arial'",

    //String - Point label font weight
    pointLabelFontStyle: "normal",

    //Number - Point label font size in pixels
    pointLabelFontSize: 10,

    //String - Point label font colour
    pointLabelFontColor: "#fff",

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 2,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: false,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  }
});
