PollrBear.Views.PollForm = Backbone.CompositeView.extend({
  template: JST['polls/form'],
  id: "poll-form-wrap",
  events: {
    'click .add-answer': 'addAnswer',
    'click .remove-answer': 'removeAnswer',
    'click #submit-poll-form': 'submitPollForm',
    'click #submit-create-poll': 'submitCreatePoll',
    'keypress input': 'delegateKeystroke',
    'keypress textarea': 'delegateKeystroke',
    'click .btn-format': 'selectFormat',
    'click .btn-chart': 'selectChart',
    'click .visit-created-poll': 'visitCreatedPoll',
    'click .errors-dismiss': 'errorsDismiss'
  },

  initialize: function(options) {
    this.pollFormData;
    this.parentView = options.parentView;
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submitPollForm: function(event) {
    event.preventDefault();
    if ($("#poll-text").val().length > 6) {
      this.pollFormData = $("#poll-form").serializeJSON();
      $("#poll-form").addClass("form-collapsed");
      $("#multiple-choice-form").removeClass("form-collapsed");
    } else {
      this.$(".errors").addClass("errors-flash").html("<span class=\"error-text\">Please enter a valid question</span> <a href=\"#\" class=\"errors-dismiss\"><i class=\"fa fa-2x fa-times-circle-o\"></i></a>");
    }
  },

  submitCreatePoll: function(event) {
    event.preventDefault();
    var answerData = $("#answer-form").serializeJSON();
    var formData = this.pollFormData;
    var $errors = this.$(".errors");
    this.collection.create(formData, {
      success: function(poll) {
        var $answers = $('.answer-item');
        $answers.each(function(index) {
          poll.answers().create({
            poll_id: poll.id,
            text: $answers.eq(index).attr("data-content")
          });
          $("#poll-form").removeClass("form-collapsed");
          $("#poll-text").val("");
          $("#multiple-choice-form").addClass("form-collapsed");
          $errors.addClass("errors-flash").html("<span class=\"error-text\">Your poll has been created! <a href=\"#\" class=\"visit-created-poll\" data-poll-id=\"" + poll.id + "\">You can view it here</a></span><a href=\"#\" class=\"errors-dismiss\"><i class=\"fa fa-2x fa-times-circle\"></i></a>")
        });
      }
    });
  },

  errorsDismiss: function(event) {
    event.preventDefault();
    this.$(".errors").removeClass("errors-flash").html("");
  },

  visitCreatedPoll: function(event) {
    event.preventDefault();
    var pollId = $(event.currentTarget).attr("data-poll-id");
    var poll = this.collection.getOrFetch(pollId);
    var answers = poll.answers();
    var view = new PollrBear.Views.PollShow({
      model: poll,
      collection: answers,
      parentView: this.parentView
    });
    this.$(".errors").removeClass("errors-flash").html("");
    this._swapMainView(view);
  },

  selectFormat: function(event) {
    event.preventDefault();
    if ($(event.currentTarget).attr("data-format") === "2") {
      $(".btn-chart").addClass("invisible");
      $("#poll-text").attr("placeholder", "Write a prompt (word cloud)");
    } else {
      $(".btn-chart").removeClass("invisible");
      $("#poll-text").attr("placeholder", "Ask a question (multiple choice)");
    }
    $(".btn-format").removeClass("btn-selected").addClass("btn-default");
    var format = ($(event.currentTarget).attr("data-format") * 1);
    $("#poll-format").val(format);
    $(event.currentTarget).removeClass("btn-default").addClass("btn-selected");
  },

  selectChart: function(event) {
    event.preventDefault();
    $(".btn-chart").removeClass("btn-selected").addClass("btn-default");
    var chart = ($(event.currentTarget).attr("data-chart") * 1);
    $("#poll-chart").val(chart);
    $(event.currentTarget).removeClass("btn-selected").addClass("btn-selected");
  },

  delegateKeystroke: function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      if (event.currentTarget.id === "poll-text") {
        this.submitPollForm(event);
      } else if (event.currentTarget.id === "answer-input") {
        this.addAnswer(event);
      }
    }
  },

  addAnswer: function(event) {
    event.preventDefault();
    var answer = this.$('#answer-text').val();
    if (answer.length > 0) {
      this.$('#answer-text').val('');
      this.$('.answer-select').append("<div class=\"answer-item\" data-content=\"" + answer + "\"><a href=\"#\" class=\"remove-answer\">Remove</a><span class=\"answer-input-text\">" + answer +  "</span></div>");
    }
  },

  removeAnswer: function(event) {
    event.preventDefault();
    $(event.currentTarget).parent().remove();
  }
});
