PollrBear.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],
  events: {
    "click .next-question": "paginateNext",
    "click .back-question": "paginateBack"
  },
  initialize: function() {
    this.collection = this.model.questions();
    this.total_pages = this.collection.totalPages();
    this.trigger('add');
    this.page = 1;
  },
  render: function() {
    var content = this.template({
      questions: this.collection,
      pages: this.model.questions().totalPages()
    });
    this.$el.html(content);
    this.collectPage();
    return this;
  },

  collectPage: function() {
    var pollId = this.model.id;
    var that = this;
    $("#questions-idx").html("");
    this.collection.fetch({
      remove: false,
      data: {
        page: that.page,
        poll_id: pollId
      },
      success: function(resp) {
        that.render();
        debugger
        return resp;
      }
    });
  },

  selectPage: function(event) {
    event.preventDefault();
    var pageNum = $(event.currentTarget).attr("data-target-page");
    this.page = pageNum;
    this.collectPage();
  },

  paginateNext: function(event) {
    event.preventDefault();
    this.page++;
    this.collectPage();
  },

  paginateBack: function(event) {
    event.preventDefault();
    if(this.page > 1) {
      this.page--;
      this.collectPage();
    }
  }
});
