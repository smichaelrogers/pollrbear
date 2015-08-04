PollrBear.Views.PollShow = Backbone.CompositeView.extend({
  template: JST['polls/show'],
  events: {
    'click .btn-answer-select': 'selectAnswer',
    'click .go-back': 'goBack'
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.colors = ["rgba(255,255,255, 0.15)", "rgba(255,255,255, 0.20)", "rgba(255,255,255, 0.25)", "rgba(255,255,255, 0.3)", "rgba(255,255,255, 0.35)", "rgba(255,255,255, 0.4)"];
    this.highlights = ["rgba(255,255,255, 0.5)", "rgba(255,255,255, 0.5)", "rgba(255,255,255, 0.5)", "rgba(255,255,255, 0.5)", "rgba(255,255,255, 0.5)", "rgba(255,255,255, 0.5)"];
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
    PollrBear.currentUser.responses().create({
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
    this.collection.forEach(function(answer) {
      lbls.push(answer.attributes.text);
      chartData.push(answer.attributes.responses.length);
    });
    var barChartData = {
      labels: lbls,
      datasets: [{
        fillColor: "rgb(255,255,255)",
        strokeColor: "rgb(255,255,255)",
        highlightFill: "rgb(255,255,255)",
        highlightStroke: "rgb(255,255,255)",
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
    var colors = this.colors;
    var highlights = this.highlights;
    this.collection.forEach(function(answer) {
      answerData = {};
      answerData['value'] = answer.attributes.responses.length;
      answerData['color'] = colors[i];
      answerData['highlight'] = highlights[i];
      answerData['label'] = answer.attributes.text;
      chartData.push(answerData);
      i++;
    });


    var chart = new Chart(ctx).PolarArea(chartData, this.polarAreaChartOptions);

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
    var chart = new Chart(ctx).Line(lineChartData, this.lineChartOptions);
  },

  barChartOptions: {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(255,255,255,0.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

    //Boolean - If there is a stroke on each bar
    barShowStroke: true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth: 1,

    //Number - Spacing between each of the X value sets
    barValueSpacing: 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  },


  lineChartOptions: {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(255,255,255,0.05)",

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
    datasetFill: false,


    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  },

  polarAreaChartOptions: {
    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop: true,

    //String - The colour of the label backdrop
    scaleBackdropColor: "rgba(255,255,255,0)",

    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero: false,

    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY: 2,

    //Number - The backdrop padding to the side of the label in pixels
    scaleBackdropPaddingX: 2,

    //Boolean - Show line for each value in the scale
    scaleShowLine: true,

    //Boolean - Stroke a line around each segment in the chart
    segmentShowStroke: true,

    //String - The colour of the stroke on each segement.
    segmentStrokeColor: "rgba(255,255,255,0.5)",

    //Number - The width of the stroke value in pixels
    segmentStrokeWidth: 1,

    //Number - Amount of animation steps
    animationSteps: 40,

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
    segmentStrokeColor: "rgba(255,255,255,0.5)",

    //Number - The width of each segment stroke
    segmentStrokeWidth: 1,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 0, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps: 30,

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
    scaleBeginAtZero: false,

    //String - Colour of the angle line
    angleLineColor: "rgba(255,255,255, 0.5)",

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
