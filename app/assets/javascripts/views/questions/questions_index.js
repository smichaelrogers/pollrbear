PollrBear.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],
  events: {
    "click .next-question": "paginateNext",
    "click .back-question": "paginateBack"
  },
  initialize: function() {
    this.collection = this.model.questions();
    this.questionSv = [];
    this.trigger('add');
    this.page = 1;
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collectPage(this.page);
    return this;
  },

  collectPage: function(page) {
    var pollId = this.model.id;
    var svs = [];
    var that = this;
    $("#questions-idx").html("");
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
          svs.push(view);
        });
      }
    });
    window.setTimeout(function() {
      svs.forEach(function(subview) {
        this.addSubview("#questions-idx", subview);
      }.bind(this));
    }.bind(this), 100);
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
