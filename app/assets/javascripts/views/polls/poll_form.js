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
		'click .notice-dismiss': 'noticeDismiss'
	},

	initialize: function (options) {
		this.pollFormData;
		this.parentView = options.parentView;
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	submitPollForm: function (event) {
		event.preventDefault();
		if ($("#poll-text").val().length > 6) {
			this.pollFormData = $("#poll-form").serializeJSON();
			$(".notice").removeClass("notice-flash");
			$("#poll-form").addClass("form-collapsed");
			if (this.pollFormData.poll.format === "2") {
				$("#open-ended-form").removeClass("form-collapsed");
			} else {
				$("#multiple-choice-form").removeClass("form-collapsed");
			}
			this.$(".notice").removeClass("notice-flash").html("");
			$("#new-poll-title").text("\"" + this.pollFormData.poll.text + "\"");
		} else {
			this.$(".notice").addClass("notice-flash").html("<span class=\"notice-text\">Please enter a valid question</span> <a href=\"#\" class=\"notice-dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>");
		}
	},

	submitCreatePoll: function (event) {
		event.preventDefault();
		var formData = this.pollFormData;
		var $notice = this.$(".notice");
		var $answers = $('.answer-item');
		$notice.removeClass("notice-flash");
		$notice.html("");
		if ($answers.length < 2 && this.pollFormData.poll.format === "1") {
			this.$(".notice").addClass("notice-flash").html("<span class=\"notice-text\">It's called <strong>multiple</strong> choice</span>, please add at least two answers <a href=\"#\" class=\"notice-dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>");
		} else {
			this.collection.create(formData, {
				success: function (poll) {
					if (formData.poll.format === "1") {
						$answers.each(function (index) {
							poll.answers().create({
								poll_id: poll.id,
								text: $answers.eq(index).attr("data-content")
							});
						});
					} else {
						poll.answers().create({
							poll_id: poll.id
						});
					}
					$("#poll-form").removeClass("form-collapsed");
					$("#poll-text").val("");
					$('.answer-item').html("");
					$("#multiple-choice-form").addClass("form-collapsed");
					$("#open-ended-form").addClass("form-collapsed");
					$notice.addClass("notice-flash").html("<span class=\"notice-text\"><strong>Success!</strong><br><a href=\"#\" class=\"visit-created-poll\" data-poll-id=\"" + poll.id + "\">Your poll has been created</a></span><a href=\"#\" class=\"notice-dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>");
				}
			});
		}
	},

	noticeDismiss: function (event) {
		event.preventDefault();
		this.$(".notice").removeClass("notice-flash").html("");
	},

	visitCreatedPoll: function (event) {
		event.preventDefault();
		var pollId = $(event.currentTarget).attr("data-poll-id");
		var poll = this.collection.getOrFetch(pollId);
		var answers = poll.answers();
		var view = new PollrBear.Views.PollShow({
			model: poll,
			collection: answers,
			parentView: this.parentView
		});
		this.$(".notice").removeClass("notice-flash").html("");
		this._swapMainView(view);
	},

	selectFormat: function (event) {
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

	selectChart: function (event) {
		event.preventDefault();
		$(".btn-chart").removeClass("btn-selected").addClass("btn-default");
		var chart = ($(event.currentTarget).attr("data-chart") * 1);
		$("#poll-chart").val(chart);
		$(event.currentTarget).removeClass("btn-selected").addClass("btn-selected");
	},

	delegateKeystroke: function (event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			if (event.currentTarget.id === "poll-text") {
				this.submitPollForm(event);
			} else if (event.currentTarget.id === "answer-input") {
				this.addAnswer(event);
			}
		}
	},

	addAnswer: function (event) {
		event.preventDefault();
		var answer = this.$('#answer-text').val();
		if (answer.length > 0) {
			this.$('#answer-text').val('');
			this.$('.answer-select').append("<div class=\"answer-item-wrap\"><div class=\"answer-item\" data-content=\"" + answer + "\"><a href=\"#\" class=\"remove-answer\"><i class=\"fa fa-times fa-lg\"></i></a><span class=\"answer-input-text\">" + answer + "</span></div></div>");
		} else {
			this.$(".notice").addClass("notice-flash").html("<span class=\"notice-text\">Please enter a valid answer</span><a href=\"#\" class=\"notice-dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>");
		}
	},

	removeAnswer: function (event) {
		event.preventDefault();
		$(event.currentTarget).parent().parent().remove();
		$(event.currentTarget).parent().remove();

	}
});
