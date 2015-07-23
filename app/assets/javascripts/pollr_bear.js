window.PollrBear = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new PollrBear.Models.CurrentUser();
    this.currentUser.fetch();
    this.dashboard = new PollrBear.Views.Dashboard({ el: $("#dashboard") });
    this.router = new PollrBear.Routers.Users({ $rootEl: $("#root") });
    Backbone.history.start();
  }
};

Chart.defaults.global.customTooltips = function(tooltip) {
  var tooltipEl = $('#chartjs-tooltip');
  if (!tooltip) {
    tooltipEl.css({
      opacity: 0
    });
    return;
  }
  tooltipEl.removeClass('above below');
  tooltipEl.addClass(tooltip.yAlign);
  tooltipEl.html(tooltip.text);
  var top;
  if (tooltip.yAlign == 'above') {
    top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
  } else {
    top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
  }
  tooltipEl.css({
    opacity: 1,
    left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
    top: tooltip.chart.canvas.offsetTop + top + 'px',
    fontFamily: tooltip.fontFamily,
    fontSize: tooltip.fontSize,
    fontStyle: tooltip.fontStyle,
  });
};
