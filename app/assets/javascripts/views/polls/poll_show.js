PollrBear.Views.PollShow = Backbone.CompositeView.extend({
  template: JST['polls/show'],
  className: "col-xs-12",
  id: "poll-show",
  events: {
    'click .btn-answer-select': 'selectAnswer',
    'click .go-back': 'goBack'
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);

    this.labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  },
  render: function() {
    var content = this.template({
      poll: this.model,
      answers: this.collection,
      labels: this.labels
    });
    this.$el.html(content);
    return this;
  },

  goBack: function(event) {
    event.preventDefault();
    var view = new PollrBear.Views.PollsIndex({
      collection: PollrBear.currentUser.polls()
    })
    this._swapMainView(view);
  },

  selectAnswer: function(event) {
    event.preventDefault();
    var poll = this.model;
    var userId = PollrBear.currentUser.id;
    var answerId = $(event.currentTarget).attr("data-answer-id");
    var answer = this.collection.getOrFetch(answerId);
    answer.responses().create({
      respondent_id: userId,
      answer_id: answerId
    });
    $("#answers").remove();
    $(".allow-realign").removeClass("overlay-collapsed");
    window.setTimeout(function() {
      $(".allow-realign").addClass("overlay-collapsed");
      $("#results").removeClass("form-collapsed");
      var view = new PollrBear.Views.PollResults({
        model: poll,
        collection: poll.answers()
      });
      $("#poll-results").html(view.render().$el);
    }, 800);
  }
});
