PollrBear.Views.PollResults = Backbone.CompositeView.extend({
	template: JST['polls/results'],
	initialize: function (options) {
		this.listenTo(this.collection, 'sync', this.delegateChartRendering);
		this.userVote = options.userVote;
		this.numVotes = [];
	},

	render: function () {
		var content = this.template({
			poll: this.model,
			answers: this.collection,
			percentages: this.percentages(),
			labels: PollrBear.labels,
			colors: PollrBear.highlights,
			total: this.totalVotes(),
			user_vote: this.userVote,
			num_votes: this.numVotes
		});
		$(".notice").remove();
		this.$el.html(content);
		this.delegateChartRendering();
		return this;
	},

	percentageChosen: function (answerId) {
		var answer = this.collection.get(answerId);
		var numResp = answer.attributes.responses.length;
		return Math.floor(numResp / this.totalVotes());
	},

	percentages: function () {
		var data = [];
		var nV = [];
		var len = this.totalVotes();
		var numResponses = 0;
		var majorityResponses = [];
		if (len > 3) {
			this.collection.forEach(function (answer) {
				if (answer.attributes.responses) {
					var n = answer.attributes.responses.length;
					nV.push(n);
					num = (answer.attributes.responses.length / len) * 100;
					data.push(Math.round(num) + "");
				}
			});
			this.numVotes = nV;
			return data;
		}
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
			answerData['color'] = PollrBear.colors[i];
			answerData['highlight'] = PollrBear.highlights[i];
			answerData['label'] = PollrBear.labels[i];
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
			labels: PollrBear.labels.slice(0, this.collection.length),
			datasets: [{
				fillColor: PollrBear.colors[0],
				strokeColor: PollrBear.highlights[0],
				highlightFill: PollrBear.highlights[0],
				highlightStroke: PollrBear.shades[0],
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
			answerData['color'] = PollrBear.colors[i];
			answerData['highlight'] = PollrBear.highlights[i];
			answerData['label'] = PollrBear.labels[i];
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
			labels: PollrBear.labels.slice(0, this.collection.length),
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
