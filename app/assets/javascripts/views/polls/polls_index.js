PollrBear.Views.PollsIndex = Backbone.CompositeView.extend({
  template: JST['polls/index'],
  id: "poll-list",
  events: {
    "click .select-poll": "selectPoll",
    "click .next-page": "nextPage",
    "click .prev-page": "prevPage",
    "click .select-page": "selectPage"
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
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
    $("li.select-page-item[data-page-id=\"" + currentPage + "\"]").addClass("active");
    if(this.collection.data) {
      this.populatePollData();
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
    var pollId, pollFormat, pollText, pollChart, pollUser, pollResponseCount;
    var pageData = this.collection.data;
    pageData.forEach(function(pollData) {
      pollId = pollData.id;
      pollFormat = pollData.format;
      pollResponseCount = pollData.response_count;
      pollText = pollData.text;
      pollChart = pollData.chart;
      pollUser = pollData.user;
      pollUserId = pollData.user_id;
      pollEmail = pollData.email;
      pollCreatedAt = pollData.created_at;

      var chartStr;
      switch(pollChart) {
        case 1:
          chartStr = "fa fa-pie-chart";
          break;
        case 2:
          chartStr = "fa fa-bar-chart";
          break;
        case 3:
          chartStr = "fa fa-line-chart";
          break;
        case 4:
          chartStr = "fa fa-area-chart";
          break;
        default:
          chartStr = "";
      }

      var formatStr;
      if(pollFormat == 2) {
        $("span.poll-format[data-poll-id=\"" + pollId + "\"]").text("WC");
      } else {
        $("span.poll-format[data-poll-id=\"" + pollId + "\"]").text("Q");
      }



      $("span.poll-text[data-poll-id=\"" + pollId + "\"]").text(pollText);
      $("span.poll-user[data-poll-id=\"" + pollId + "\"]").html(pollCreatedAt + "  <a href=\"#\" class=\"select-show-user\" data-user-id=\"" + pollUserId + "\"> " + pollUser + " </a>");
      $("span.poll-responses[data-poll-id=\"" + pollId + "\"]").text(pollResponseCount);
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
