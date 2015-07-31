window.PollrBear = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('initialize');
    this.currentUser = new PollrBear.Models.CurrentUser();
    this.currentUser.fetch();
    this.nav = new PollrBear.Views.Nav({
      el: $("#nav")
    });
    this.router = new PollrBear.Routers.Users({
      $rootEl: $("#root")
    });
    Backbone.history.start();
  }
};


Chart.defaults.global = {
  animation: true,
  animationSteps: 60,
  animationEasing: "easeOutQuart",
  showScale: true,
  scaleOverride: false,
  scaleSteps: null,
  scaleStepWidth: null,
  scaleStartValue: null,
  scaleLineColor: "rgba(0,0,0,0)",
  scaleLineWidth: 1,
  scaleShowLabels: true,
  scaleLabel: "<%=value%>",
  scaleIntegersOnly: true,
  scaleBeginAtZero: false,
  scaleFontFamily: "'Proxima Nova', 'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  scaleFontSize: 13,
  scaleFontStyle: "normal",
  scaleFontColor: "#999",
  responsive: true,
  maintainAspectRatio: true,
  showTooltips: true,
  customTooltips: false,
  tooltipEvents: ["mousemove", "touchstart", "touchmove"],
  tooltipFillColor: "rgb(112, 202, 200)",
  tooltipFontFamily: "'Proxima Nova', 'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  tooltipFontSize: 14,
  tooltipFontStyle: "normal",
  tooltipFontColor: "#555",
  tooltipTitleFontFamily: "'Proxima Nova', 'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  tooltipTitleFontSize: 16,
  tooltipTitleFontStyle: "bold",
  tooltipTitleFontColor: "#555",
  tooltipYPadding: 6,
  tooltipXPadding: 6,
  tooltipCaretSize: 8,
  tooltipCornerRadius: 6,
  tooltipXOffset: 10,
  tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
  multiTooltipTemplate: "<%= value %>",

  onAnimationProgress: function() {},

  onAnimationComplete: function() {},
};
