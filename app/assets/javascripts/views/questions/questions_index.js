PollrBear.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],
  events: {
    "click .next-question": "paginateNext",
    "click .back-question": "paginateBack"
  },

  initialize: function() {
    this.collection = this.model.questions();
    var pollId = this.collection.poll.id;
    this.collection.fetch({
      remove: false,
      data: { page: 1,
      poll_id:  pollId},
      success:function() {}
    });
    window.setTimeout(function() {
      this.listenTo(this.collection, 'sync', this.render);
      this.renderQuestions();
    }.bind(this), 1000);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderQuestions: function() {
    this.collection.forEach(function(question) {
      var view = new PollrBear.Views.QuestionShow({
        model: question
      });
      this.addSubview("#questions-idx", view);
    }.bind(this));
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
  }
});
