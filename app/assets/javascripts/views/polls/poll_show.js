PollrBear.Views.PollShow = Backbone.CompositeView.extend({
  template: JST['polls/show'],
  className: 'content-poll',
  events: {
    'click .'
    'click .view-collapse': 'collapse',
    'keydown input': 'maybeCreate'
  },
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
  // render will display all uncollapsed questions
  showQuestion: function(event) {

  }
});
