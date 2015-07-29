PollrBear.Views.PollShow = Backbone.CompositeView.extend({
  template: JST['polls/show'],
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    return this;
  },

  renderChart: function() {
    var view = new PollrBear.Views.PollChart({
      model: this.model,
      collection: this.collection
    });
  },

  percentages: function() {
    var data = [];
    var num;
    var len = 0;
    this.collection.forEach(function(answer) {
      len += answer.responses.length;
    });
    this.collection.forEach(function(answer) {
      num = (answer.responses.length / len) * 100
      data.push(Math.floor(num) + "%");
    });
    return data;
  }
});
