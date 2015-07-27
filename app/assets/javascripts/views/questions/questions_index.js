PollrBear.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],
  events: {
    "click .next-question": "paginateNext",
    "click .back-question": "paginateBack"
  },
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    this.renderQuestions();
    return this;
  },

  paginateNext: function(event) {
    event.preventDefault();
    var pollId = this.model.id
    this.collection.fetch({
      remove: false,
      data: {
        page: this.page + 1
      },
      success: function() {
        this.page++;
      }
    });
  },

  paginateBack: function(event) {
    event.preventDefault();
    var pollId = this.model.id
    this.collection.fetch({
      remove: false,
      data: {
        page: this.page - 1
      },
      success: function() {
        this.page--;
      }
    });
  },

  renderQuestions: function() {
    $("#questions-idx").html("");
    this.collection.forEach(function(question) {
      var view = new PollrBear.Views.QuestionShow({
        model: question
      });
      $("#questions-idx").append(view.render().$el);
    });
  }
});
