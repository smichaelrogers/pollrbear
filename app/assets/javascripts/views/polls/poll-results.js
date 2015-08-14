PollrBear.Views.PollResults = Backbone.CompositeView.extend({
	template: JST['polls/results'],
	className: "multiple-choice-results",
	initialize: function () {
		this.listenTo(this.collection, 'sync', this.delegateChartRendering);
		this.colors = [
      "rgba(42, 183, 201, 0.7)",
      "rgba(254,215,101, 0.7)",
      "rgba(254,74,73, 0.7)",
			"rgba(6, 214, 160, 0.7)",
			"rgba(194, 100, 209, 0.7)",
      "rgba(0, 141, 213, 0.7)",
      "rgba(255, 189, 0, 0.7)",
      "rgba(255, 116, 158, 0.7)",
      "rgba(0,225,255, 0.7)"
    ];
		this.highlights = [
			"rgba(42, 183, 201, 1.0)",
      "rgba(254,215,101, 1.0)",
      "rgba(254,74,73, 1.0)",
			"rgba(6, 214, 160, 1.0)",
			"rgba(194, 100, 209, 1.0)",
      "rgba(0, 141, 213, 1.0)",
      "rgba(255, 189, 0, 1.0)",
      "rgba(255, 116, 158, 1.0)",
      "rgba(0,225,255, 1.0)"
    ];
		this.tints = [
			"rgba(71, 206, 223, 1)",
      "rgba(251, 222, 137, 1)",
      "rgba(247, 108, 108, 1)",
			"rgba(60, 236, 190, 1)",
			"rgba(214, 143, 226, 1)",
      "rgba(55, 173, 233, 1)",
      "rgba(245, 204, 87, 1)",
      "rgba(250, 145, 177, 1)",
      "rgba(95, 229, 247, 1)"
    ];
		this.shades = [
			"rgba(32, 154, 170, 1)",
			"rgba(223, 187, 80, 1)",
			"rgba(215, 64, 64, 1)",
			"rgba(6, 184, 137, 1)",
			"rgba(159, 79, 172, 1)",
			"rgba(5, 114, 170, 1)",
			"rgba(214, 161, 9, 1)",
			"rgba(219, 83, 124, 1)",
			"rgba(4, 186, 210, 1)"
		];
		this.labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
		this.userResponse;
		this.majorityResponse;
	},

	render: function () {
		var content = this.template({
			poll: this.model,
			answers: this.collection,
			percentages: this.percentages(),
			labels: this.labels,
			colors: this.highlights,
			total: this.totalVotes()
		});
		this.$el.html(content);
		this.delegateChartRendering();
		return this;
	},

	percentageChosen: function (answerId) {
		var answer = this.collection.get(answerId);
		var numResp = answer.attributes.responses.length;
		return Math.floor(numResp / this.totalVotes());
	},

	mostChosen: function () {

	},

	percentages: function () {
		var data = [];
		var len = this.totalVotes();
		if(len > 3) {
			var num;
			this.collection.forEach(function (answer) {
				if (answer.attributes.responses) {
					num = (answer.attributes.responses.length / len) * 100
					data.push(Math.round(num) + "");
				}
			});
		}
		return data;
	},

	totalVotes: function () {
		var len = 0;
		this.collection.forEach(function (answer) {
			if (answer.attributes.responses) {
				len += answer.attributes.responses.length;
			}
		});
		return len;
	},

	delegateChartRendering: function () {
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
			default:
				return;
		};
	},

	renderPieChart: function () {
		var ctx = $("#chart")[0].getContext("2d");
		var answerData, pieChartData = [],
			i = 0;
		this.collection.forEach(function (answer) {
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

	renderBarChart: function () {
		var ctx = $("#chart")[0].getContext("2d");
		var chartData = [];
		this.collection.forEach(function (answer) {
			chartData.push(answer.attributes.responses.length);
		});
		var barChartData = {
			labels: this.labels.slice(0, this.collection.length),
			datasets: [{
				fillColor: this.colors[0],
				strokeColor: this.highlights[0],
				highlightFill: this.highlights[0],
				highlightStroke: this.shades[0],
				data: chartData
      }]
		}


		var chart = new Chart(ctx).Bar(barChartData, this.barChartOptions);
	},

	renderPolarAreaChart: function () {
		var ctx = $("#chart")[0].getContext("2d");
		var chartData = [];
		var answerData;
		var i = 0;
		this.collection.forEach(function (answer) {
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
	renderLineChart: function () {
		var ctx = $("#chart")[0].getContext("2d");
		var chartData = [];
		this.collection.forEach(function (answer) {
			chartData.push(answer.attributes.responses.length);
		});
		var lineChartData = {
			labels: this.labels.slice(0, this.collection.length),
			datasets: [{
				fillColor: "rgba(42, 183, 201, 0.3)",
				strokeColor: "rgba(42, 183, 201, 1.0)",
				pointColor: "rgba(42, 183, 201, 1.0)",
				pointStrokeColor: "rgba(42, 183, 201, 1.0)",
				pointHighlightFill: "rgba(34, 121, 133, 1)",
				pointHighlightStroke: "rgba(28, 120, 131, 1)",
				data: chartData
      }]
		}
		var chart = new Chart(ctx).Line(lineChartData, this.lineChartOptions);
	},

	barChartOptions: {
		scaleBeginAtZero: true,
		scaleShowGridLines: true,
		scaleGridLineColor: "rgba(231, 231, 231, 0.78)",
		scaleGridLineWidth: 1,
		scaleShowHorizontalLines: true,
		scaleShowVerticalLines: true,
		barShowStroke: true,
		barStrokeWidth: 1,
		barValueSpacing: 10,
		barDatasetSpacing: 1,
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	},


	lineChartOptions: {
		scaleShowGridLines: true,
		scaleGridLineColor: "rgba(231, 231, 231, 0.78)",
		scaleGridLineWidth: 1,
		scaleShowHorizontalLines: true,
		scaleShowVerticalLines: true,
		bezierCurve: true,
		bezierCurveTension: 0.4,
		pointDot: true,
		pointDotRadius: 3,
		pointDotStrokeWidth: 1,
		pointHitDetectionRadius: 12,
		datasetStroke: true,
		datasetStrokeWidth: 2,
		datasetFill: true,
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	},

	polarAreaChartOptions: {
		scaleShowLabelBackdrop: false,
		scaleBackdropColor: "rgba(255,255,255,0)",
		scaleBeginAtZero: true,
		scaleBackdropPaddingY: 3,
		scaleBackdropPaddingX: 5,
		scaleShowLine: true,
		segmentShowStroke: true,
		segmentStrokeColor: "rgba(255,255,255,0.3)",
		segmentStrokeWidth: 1,
		animationSteps: 100,
		animationEasing: "easeOutBounce",
		animateRotate: true,
		animateScale: true,
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	},

	pieChartOptions: {
		segmentShowStroke: true,
		segmentStrokeColor: "rgba(255,255,255,0.3)",
		segmentStrokeWidth: 1,
		percentageInnerCutout: 0,
		animationSteps: 100,
		animationEasing: "easeOutBounce",
		animateRotate: true,
		animateScale: true,
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

	}
});
