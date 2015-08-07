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
    $("li.select-page-item[data-page-id=\"" + currentPage + "\"]").addClass("active");
    if (this.collection.data) {
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
    var formatStr;
    var formatClass;
    var textStr = "";
    var pageData = this.collection.data;
    pageData.forEach(function(p) {
      if (p.format == 2) {
        formatStr = "open ended";
        formatClass = "format-oe";
      } else {
        formatStr = "multiple choice";
        formatClass = "format-mc";
      }
      if (p.text.length > 140) {
        textStr = p.text.slice(0, 140) + "...";
      } else {
        textStr = p.text;
      }
      $("div.poll-text[data-poll-id=\"" + p.id + "\"]").text(textStr);
      $("div.poll-user[data-poll-id=\"" + p.id + "\"]").html(p.created_at + " <a href=\"#\" class=\"select-show-user\" data-user-id=\"" + p.user_id + "\"> " + p.user + " </a><br>" + p.expires_in);
      var voteStr = ((p.response_count === 0 || p.response_count > 1) ? "votes" : "vote");
      $("div.poll-votes-wrap[data-poll-id=\"" + p.id + "\"]").html("<span class=\"poll-votes\">" + p.response_count + " " + voteStr + "</span>");
      $("div.poll-info[data-poll-id=\"" + p.id + "\"]").html("<span class=\"" + formatClass + "\">" + formatStr + "</span>");
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
