PollrBear.Views.InvitesIndex = Backbone.DashboardView.extend({
  template: JST['invites/index'],
  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    var content = this.template({
      invites: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
