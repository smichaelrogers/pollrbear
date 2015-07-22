PollrBear.Views.PieChart = Backbone.View.extend({
  tagName: "canvas",
  className: "pie-chart",
  template: JST['charts/pie'],
  initialize: function(options) {
    this.collection = options.answers;
    this.listenTo(this.collection, 'change', this.render);
  },
  render: function() {
    this.$el.html(this.template());
    var data = this.parseCollection();
    var ctx = this.$el.get(0).getContext("2d");
    var options = {};
    var chart = new Chart(ctx).Line(data, options);
    return this;
  }
});
