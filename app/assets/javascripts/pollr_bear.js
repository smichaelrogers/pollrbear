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



Chart.defaults.global = {
	animation: true,
	animationSteps: 100,
	animationEasing: "easeInCubic",
	showScale: true,
	scaleOverride: false,
	scaleSteps: null,
	scaleStepWidth: null,
	scaleStartValue: null,
	scaleLineColor: "rgb(177, 177, 177)",
	scaleLineWidth: 1,
	scaleShowLabels: true,
	scaleLabel: "<%=value%>",
	scaleIntegersOnly: true,
	scaleBeginAtZero: true,
	scaleFontFamily: "'Helvetica Neue', 'Roboto', 'Helvetica', 'Arial', sans-serif",
	scaleFontSize: 14,
	scaleFontStyle: "normal",
	scaleFontColor: "rgba(164, 164, 164, 1)",
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
