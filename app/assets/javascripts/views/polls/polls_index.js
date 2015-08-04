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


    $(document).ready(function() {
      window.setTimeout(function() {

      }.bind(this), 500);
    }.bind(this));
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
    if (currentPage === 1) {
      this.$(".prev-page").addClass("disabled");
    } else {
      this.$(".prev-page").removeClass("disabled");
    }
    if (currentPage === this.collection.get('total-pages')) {
      this.$(".next-page").addClass("disabled");
    } else {
      this.$(".next-page").removeClass("disabled");
    }
    this.$(".select-page").removeClass("active");
    $("li[data-page-id=\"" + currentPage + "\"]").addClass("active");
    this.$el.html(content);
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
      pollUser = pollData.email;

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
        $("i.poll-chart[data-poll-id=\"" + pollId + "\"]").addClass(chartStr);
      }

      $("span.poll-text[data-poll-id=\"" + pollId + "\"]").text(pollText);
      $("span.poll-user[data-poll-id=\"" + pollId + "\"]").text(pollUser);
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
    this.fetchPage(this.collection.get('page') + 1);
  },

  prevPage: function(event) {
    this.fetchPage(this.collection.get('page') - 1);
  }
});
