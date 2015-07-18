PollrBear.Collections.Charts = Backbone.Collection.extend({
  model: PollrBear.Models.Chart,
  url: '/api/charts',
  initialize: function(models, options) {
    this.question = options.question;
  },
  getOrFetch: function (id) {
    var chart = this.get(id);
    if (!chart) {
      chart = new PollrBear.Models.Chart({ id: id });
      chart.fetch({
        success: function () {
          this.add(chart);
        }.bind(this)
      });
    } else {
      chart.fetch();
    }
    return chart;
  }

});
