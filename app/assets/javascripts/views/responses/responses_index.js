PollrBear.Views.ResponsesIndex = Backbone.DashboardView.extend({
  template: JST['responses/index'],
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.fetch();
  },
  render: function() {
    var content = this.template({
      responses: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
