PollrBear.Views.ResponsesIndex = Backbone.View.extend({
  template: JST['responses/index'],
  initialize: function() {
    this.collection = this.model.responses();
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
