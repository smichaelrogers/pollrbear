PollrBear.Views.AnswerShow = Backbone.View.extend({
  template: JST['answers/show'],
  events: {
    "click .show-responses": "renderResponses"
  },
  initialize: function() {
  },
  render: function() {
    var content = this.template({
      answer: this.model
    });
    this.$el.html(content);
    return this;
  },
  renderResponses: function(event) {
    event.preventDefault();
    var view = new PollrBear.Views.ResponsesIndex({
      model: this.model
    });
    this.$(".responses").html(view.render().$el);
  }
});
