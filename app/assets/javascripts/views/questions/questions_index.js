PollrBear.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],
  events: {
    "click .next-question": "paginateNext",
    "click .back-question": "paginateBack"
  },
  initialize: function() {
    this.page = 0;
    this.collection = this.model.questions();
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.fetch({
      remove: false,
      data: {"page": 0},
      success: function() {}
    });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.renderQuestions();
    return this;
  },

  paginateNext: function(event) {
    event.preventDefault();
    this.collection.fetch({
      remove: false,
      data: { "page": this.page + 1 },
      success: function() {
        this.page++;
      }
    });
  },

  paginateBack: function(event) {
    event.preventDefault();
    this.collection.fetch({
      remove: false,
      data: {"page": this.page - 1},
      success: function() {
        this.page--;
      }
    });
  },

  renderQuestions: function() {
    $("#questions-idx").html("");
    this.collection.forEach(function(question) {
      var view = new PollrBear.Views.QuestionShow({
        question: this.collection.at(0)
      });
      $("#questions-idx").append(view.render().$el);
    }.bind(this));
  }
});
