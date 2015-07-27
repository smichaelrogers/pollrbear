PollrBear.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],
  events: {
    "click .next-question": "paginateNext",
    "click .back-question": "paginateBack"
  },
  initialize: function() {
    this.page = 1;
  },
  render: function() {
    var poll = PollrBear.currentUser.polls().getOrFetch(this.model.id)
    var content = this.template({
      poll: poll
    });
    this.$el.html(content);
    this.collectPage(this.page);
    return this;
  },

  collectPage: function(page) {
    var pollId = this.model.id;
    var that = this;
    this.collection.fetch({
      remove: false,
      data: {
        page: page,
        poll_id: pollId
      },
      success: function(response) {
        that.collection.add(response.models);
        response.models.forEach(function(question) {
          var view = new PollrBear.Views.QuestionShow({
            model: question,
            collection: response.poll.questions()
          });
          $("#questions-idx").append(view.render().$el);
        });
      }
    });
  },

  paginateNext: function(event) {
    event.preventDefault();
    this.page++;
    this.render();
  },

  paginateBack: function(event) {
    event.preventDefault();
    if(this.page > 1) {
      this.page--;
      this.render();
    }
  }
});
