PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  className: "col-xs-12",
  events: {
    "click .poll-select": "selectPoll",
    "click .page-nav-next": "nextPage",
    "click .page-nav-prev": "prevPage",
    "click .page-nav-select": "selectPage",
    "click .poll-delete": "deletePoll"
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync add destroy', this.render);
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
    if($(event.target).attr("type") === "button"){
      return;
    } else {
      var pollId = $(event.currentTarget).attr("data-poll-id");
      var poll = this.collection.getOrFetch(pollId);
      var view = new PollrBear.Views.PollShow({
        model: poll,
        collection: poll.answers(),
        parentView: this
      });
      this._swapMainView(view);
    }
  },

  deletePoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr("data-destroy-poll-id");
    var poll = this.collection.get(pollId);
    poll.destroy();
  },



  populatePollData: function() {
    var formatStr;
    var formatClass;
    var textStr = "";
    var pageData = this.collection.data;
    pageData.forEach(function(p) {
      if (p.format === 2) {
        formatStr = "<span class=\"poll-open-ended\">Open Ended</span>";
      } else {
        formatStr = "<span class=\"poll-multiple-choice\">Multiple Choice</span>";
      }
      if (p.text.length > 120) {
        textStr = "<p>" + p.text.slice(0, 120) + " ... </p>";
      } else {
        textStr = "<p>" + p.text + "</p>";
      }
      if (p.user_id === PollrBear.currentUser.id) {
        textStr += "<span><button type=\"button\" class=\"btn btn-std poll-delete\" data-destroy-poll-id=\"" + p.id + "\">Delete</button></span>";
      } else {
        textStr += "<span></span>";
      }
      $("div.poll-text[data-poll-id=\"" + p.id + "\"]").html(textStr);
      $("div.poll-votes[data-poll-id=\"" + p.id + "\"]").html(p.response_count + "");
      $("div.poll-info[data-poll-id=\"" + p.id + "\"]").html("<div class=\"poll-format\">" + formatStr + " </div><div class=\"poll-created\">" + p.created_at + " by " +  p.user + "</div>");
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
