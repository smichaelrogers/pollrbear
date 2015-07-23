PollrBear.Views.InvitesIndex = Backbone.DashboardView.extend({
  template: JST['invites/index'],
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.fetch();
  },
  render: function() {
    var content = this.template({
      invites: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
