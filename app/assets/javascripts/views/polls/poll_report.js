PollrBear.Views.PollReport = Backbone.CompositeView.extend({
  template: JST['polls/report'],
  className: 'content-report',
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    return this;
  },
  showQuestions: function() {

  }
});
