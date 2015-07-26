PollrBear.Views.QuestionPreview = Backbone.View.extend({
  template: JST['questions/preview'],
  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  },

  updateData: function() {
    if(this.model.answers()){
      var view = new PollrBear.Views.ChartShow({
        model: this.model
      });
      $("#chart-preview").html(view.render().$el);
    }
  },

  percentages: function() {
    var data = [];
    var num;
    var len = 0;
    this.collection.forEach(function(answer) {
      len += answer.responses().length;
    });
    this.collection.forEach(function(answer) {
      num = (answer.responses().length / len) * 100
      data.push(Math.floor(num) + "%");
    });
    return data;
  }
});
