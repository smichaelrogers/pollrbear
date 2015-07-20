PollrBear.Views.PollForm = Backbone.DashboardView.extend({
  template: JST['polls/form'],
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.render();
  },
  render: function() {
    var content = this.template({
      collection: this.collection
    });
    this.$el.html(content);
    return this;
  }
});
