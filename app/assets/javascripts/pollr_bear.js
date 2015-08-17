window.PollrBear = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function () {
		this.currentUser = new PollrBear.Models.CurrentUser();
		this.currentUser.fetch();
		this.users = new PollrBear.Collections.Users();
		this.users.fetch();
		this.router = new PollrBear.Routers.Users({
			$rootEl: $("#root")
		});
		Backbone.history.start();
	}
};
PollrBear.colors = [
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
PollrBear.highlights = [
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
PollrBear.tints = [
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
PollrBear.shades = [
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
PollrBear.labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

PollrBear.chartIcons = ["fa-cloud", "fa-pie-chart", "fa-bar-chart", "fa-line-chart", "fa-pie-chart"];
PollrBear.chartColors = ["rgba(254,215,101, 1.0)", "rgba(6, 214, 160, 1.0)", "rgba(42, 183, 201, 1.0)", "rgba(247, 108, 108, 1)", "rgba(194, 100, 209, 1.0)"];

Chart.defaults.global = {
	animation: true,
	animationSteps: 100,
	animationEasing: "easeInCubic",
	showScale: true,
	scaleOverride: false,
	scaleSteps: null,
	scaleStepWidth: null,
	scaleStartValue: null,
	scaleLineColor: "rgb(214, 214, 214)",
	scaleLineWidth: 1,
	scaleShowLabels: true,
	scaleLabel: "<%=value%>",
	scaleIntegersOnly: true,
	scaleBeginAtZero: true,
	scaleFontFamily: "'Helvetica Neue', 'Roboto', 'Helvetica', 'Arial', sans-serif",
	scaleFontSize: 14,
	scaleFontStyle: "normal",
	scaleFontColor: "rgba(130, 130, 130, 1)",
	responsive: false,
	maintainAspectRatio: true,
	showTooltips: true,
	customTooltips: false,
	tooltipEvents: ["mousemove", "touchstart", "touchmove"],
	tooltipFillColor: "rgba(255, 255, 255, 1)",
	tooltipFontFamily: "'Helvetica Neue', 'Roboto', 'Helvetica', 'Arial', sans-serif",
	tooltipFontSize: 16,
	tooltipFontStyle: "bold",
	tooltipFontColor: "rgba(124, 124, 124, 1)",
	tooltipTitleFontFamily: "'Helvetica Neue', 'Roboto', 'Helvetica', 'Arial', sans-serif",
	tooltipTitleFontSize: 16,
	tooltipTitleFontStyle: "bold",
	tooltipTitleFontColor: "#838383",
	tooltipYPadding: 8,
	tooltipXPadding: 12,
	tooltipCaretSize: 6,
	tooltipCornerRadius: 6,
	tooltipXOffset: 6,
	tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
	multiTooltipTemplate: "<%= value %>",
	onAnimationProgress: function () {},
	onAnimationComplete: function () {}

}
