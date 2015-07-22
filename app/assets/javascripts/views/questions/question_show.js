PollrBear.Views.QuestionShow = Backbone.DashboardView.extend({

  template: JST['questions/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    this.renderPieChart();
    return this;
  },

  generateData: function() {
    var data = [];
    if (this.model.answers()) {

      this.model.answers().forEach(function(answer) {
        var obj = {
          value: answer.responses().length,
          color: "#333333",
          highlight: "#ED503D",
          label: answer.get('text')
        };
        data.push(obj);
      });
    };
    return data;
  };

  renderPieChart: function() {
    var canvas = this.$('canvas');
    var data = this.generateData();
    var ctx = this.$el.get(0).getContext("2d");
    var options = {};
    var chart = new Chart(ctx).Pie(data, options);
    return this;
  }
});
