PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  className: "col-xs-12",
  events: {
    "click .poll-select": "selectPoll",
    "click .page-nav-next": "nextPage",
    "click .page-nav-prev": "prevPage",
    "click .page-nav-select": "selectPage"
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync add', this.render);
    this.collection.fetch({
      remove: true,
      data: {
        page: 1
      }
    });
  },


  render: function() {
    var currentPage = this.collection.page;
    console.log("rendering collection page" + currentPage);
    var content = this.template({
      currentPage: currentPage,
      totalPages: this.collection.total_pages,
      polls: this.collection,
      user: this.model
    });
    this.$el.html(content);
    if (this.collection.data) {
      this.populatePollData();
    }
    $(".page-nav-select[data-page-id=\"" + currentPage + "\"]").addClass("page-nav-active");
    if(currentPage === 1){
      $(".page-nav-prev").addClass("page-nav-disabled");
    }
    if(currentPage === this.collection.total_pages) {
      $(".page-nav-next").addClass("page-nav-disabled");
    }
    return this;
  },
  selectPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr("data-poll-id");
    var poll = this.collection.getOrFetch(pollId);
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: poll.answers(),
      parentView: this
    });
    this._swapMainView(view);
  },
  populatePollData: function() {
    var formatStr;
    var formatClass;
    var textStr = "";
    var pageData = this.collection.data;
    pageData.forEach(function(p) {
      if (p.format === 2) {
        formatStr = "Open Ended";
      } else {
        formatStr = "Multiple Choice";
      }
      if (p.text.length > 60) {
        textStr = p.text.slice(0, 60) + " ... ";
      } else {
        textStr = p.text;
      }

      $("div.poll-text[data-poll-id=\"" + p.id + "\"]").text(textStr);
      $("div.poll-votes[data-poll-id=\"" + p.id + "\"]").html(p.response_count + "");
      $("div.poll-info[data-poll-id=\"" + p.id + "\"]").html(formatStr + " | " + p.created_at + " by " +  p.user + ", " + p.expires_in);
    });
  },
  fetchPage: function(pageNum) {
    this.collection.fetch({
      remove: true,
      data: {
        page: pageNum * 1
      }
    });
  },

  selectPage: function(event) {
    var pageNum = $(event.currentTarget).attr("data-page-id");
    this.fetchPage(pageNum);
  },


  nextPage: function(event) {
    this.fetchPage((this.collection.page + 1));
  },

  prevPage: function(event) {
    this.fetchPage((this.collection.page - 1));
  }
});
