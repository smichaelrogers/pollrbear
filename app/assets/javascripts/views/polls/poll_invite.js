PollrBear.Views.PollInvite = Backbone.CompositeView.extend({
  template: JST['polls/invite'],
  className: 'content-invite',
  initialize: function() {
    this.collection = this.model.questions();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.render);
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
