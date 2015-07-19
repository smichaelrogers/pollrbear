PollrBear.Views.PollReport = Backbone.DashboardView.extend({
  template: JST['polls/report'],

  initialize: function() {
    if(options.display === 1) {
      this.collection = this.model.questions();
    }

    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      poll: this.model,
      collection: this.collection
    });
    this.$el.html(content);
    return this;
  }
});
