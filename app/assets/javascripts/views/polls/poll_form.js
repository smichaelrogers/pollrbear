PollrBear.Views.PollForm = Backbone.View.extend({
  template: JST['polls/form'],

  events: {
    'click .add-answer': 'addAnswer',
    'click a.remove-answer': 'removeAnswer',
    'click #submit-poll-form': 'submitPollForm',
    'click #submit-create-poll': 'submitCreatePoll',
    'keypress .answer-input': 'maybeAddAnswer',
    'click .btn-format': 'selectFormat',
    'click .btn-chart': 'selectChart'
  },

  initialize: function() {
    this.pollFormData;
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submitPollForm: function(event) {
    event.preventDefault();
    this.pollFormData = $("#poll-form").serializeJSON();
    $("#poll-form").addClass("form-collapsed");
    // if ($("#poll-format").attr("data-format") === "2") {
    //   $("#open-ended-form").removeClass("form-collapsed");
    // } else {
    // }
    $("#multiple-choice-form").removeClass("form-collapsed");
  },

  submitCreatePoll: function(event) {
    event.preventDefault();
    var answerData = $("#answer-form").serializeJSON();
    var formData = this.pollFormData;
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
        });
      }
    });
  },

  selectFormat: function(event) {
    event.preventDefault();
    if ($(event.currentTarget).attr("data-format") === "2") {
      $(".btn-chart").addClass("invisible");
    } else {
      $(".btn-chart").removeClass("invisible");
    }
    $(".btn-format").removeClass("btn-success").addClass("btn-default");
    var format = ($(event.currentTarget).attr("data-format") * 1);
    $("#poll-format").val(format);
    $(event.currentTarget).removeClass("btn-default").addClass("btn-success");
  },

  selectChart: function(event) {
    event.preventDefault();
    $(".btn-chart").removeClass("btn-success").addClass("btn-default");
    var chart = ($(event.currentTarget).attr("data-chart") * 1);
    $("#poll-chart").val(chart);
    $(event.currentTarget).removeClass("btn-success").addClass("btn-success");
  },

  maybeAddAnswer: function(event) {
    if (event.keyCode === 13) {
      this.addAnswer();
    }
  },

  addAnswer: function(event) {
    var answer = this.$('.answer-input').val();
    this.$('.answer-input').val('');
    this.$('.answer-select').append("<li class=\"list-group-item answer-item\" data-content=\"" + answer + "\">" + answer + "<a href=\"#\" class=\"remove-answer\">Remove</a></li>");
  },

  removeAnswer: function(event) {
    event.preventDefault();
    $(event.currentTarget).parent().remove();
  }
});
