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
		'click .dismiss': 'dismissNotice'
	},

	initialize: function (options) {
		this.pollFormData;
		this.parentView = options.parentView;
		this.answersAdded = [];
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	submitPollForm: function (event) {
		event.preventDefault();
		this.dismissNotice(event);
		if ($("#poll-text").val().length > 1) {
			this.pollFormData = $("#poll-form").serializeJSON();
			$("#poll-form").addClass("form-collapsed");
			if (this.pollFormData.poll.format === "2") {
				$("#open-ended-form").removeClass("form-collapsed");
			} else {
				$("#multiple-choice-form").removeClass("form-collapsed");
			}
			$(".new-poll-preview-question").html(this.pollFormData.poll.text);
		} else {
			this.renderNoticeBefore($("#poll-text"), "Not much of a question...");
		}
	},

	submitCreatePoll: function (event) {
		event.preventDefault();
		this.dismissNotice(event);
		var that = this;
		var formData = this.pollFormData;
		var $answers = $('.answer-item');
		if ($answers.length < 2 && this.pollFormData.poll.format === "1") {
			this.renderNoticeBefore($("#answer-text"), "<strong>Multiple</strong> choices please");
		} else {
			this.renderLoader(this.$el);
			if(formData.format === "2") {
				formData.poll.chart = "0";
			}
			this.collection.create(formData, {
				success: function (poll) {
					that.$(".loader").remove();
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
					that.renderNoticeBefore($("#poll-text"), "Your poll has been created<br><button type=\"button\" class=\"btn btn-uniq visit-created-poll\" data-poll-id=\"" + poll.id + "\">Preview</button>");
				}
			});
		}
	},

	visitCreatedPoll: function (event) {
		event.preventDefault();
		this.dismissNotice(event);
		var poll = this.collection.getOrFetch($(event.currentTarget).attr("data-poll-id"));
		var view = new PollrBear.Views.PollShow({
			model: poll,
			collection: poll.answers(),
			parentView: this.parentView
		});
		this._swapMainView(view);
	},

	selectFormat: function (event) {
		event.preventDefault();
		if ($(event.currentTarget).attr("data-format") === "2") {
			$(".btn-chart").addClass("invisible");
			$("#poll-text").attr("placeholder", "Word Cloud - Write a prompt");
		} else {
			$(".btn-chart").removeClass("invisible");
			$("#poll-text").attr("placeholder", "Multiple Choice - Write a question");
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
			} else if (event.currentTarget.id === "answer-text") {
				this.addAnswer(event);
			}
		}
	},

	addAnswer: function (event) {
		event.preventDefault();
		this.dismissNotice(event);
		var answerStr = "";
		var answer = this.$('#answer-text').val();
		if (answer.length > 0) {
			this.$('#answer-text').val('');
			answerStr = "<div class=\"answer-item-wrap\"><div class=\"answer-item\" data-content=\"" + answer + "\"><span class=\"answer-input-text\">" + answer + "</span></div><a href=\"#\" class=\"remove-answer\"><i class=\"fa fa-times\"></i></a></div>";
			this.$('.answer-select').append(answerStr);
			this.addLabels();
		} else {
			this.renderNoticeBefore($("#answer-text"), "Maybe a bit longer")
		}
	},

	addLabels: function() {
		$(".answer-item-label").remove();
		var $targets = $(".answer-item-wrap");
		$targets.each(function(index) {
			$(this).prepend("<div class=\"answer-item-label\" style=\"color: " + PollrBear.highlights[index] + "\">" + PollrBear.labels[index] + ": </div>");
		});
	},

	removeAnswer: function (event) {
		event.preventDefault();
		$(event.target).parent().parent().remove();
		this.addLabels();
	},

	dismissNotice: function(event) {
		event.preventDefault();
		$(".notice").remove();
	}
});
