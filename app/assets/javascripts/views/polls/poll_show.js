PollrBear.Views.PollShow = Backbone.CompositeView.extend({
	template: JST['polls/show'],
	className: "col-xs-12",
	id: "poll-show",
	events: {
		'click .btn-answer-select': 'selectAnswer',
		'click .go-back': 'goBack',
		'click #submit-word-cloud': 'submitWordCloud',
		'click .dismiss': 'dismissNotice'
	},
	initialize: function () {
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.model, 'sync', this.render);
		this.labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
	},
	render: function () {
		var content = this.template({
			poll: this.model,
			answers: this.collection,
			labels: PollrBear.labels,
			colors: PollrBear.highlights
		});
		this.$el.html(content);
		return this;
	},

	goBack: function (event) {
		event.preventDefault();
		var view = new PollrBear.Views.PollsIndex({
			collection: PollrBear.currentUser.polls()
		})
		this._swapMainView(view);
	},

	submitWordCloud: function (event) {
		event.preventDefault();
		var that = this;
		var text = $("#word-cloud-text").val();
		var answer = this.model.answers().at(0);
		if (text.length > 0) {
			this.renderLoader($("#poll-wrap"));
			answer.responses().create({
				respondent_id: PollrBear.currentUser.id,
				answer_id: answer.id,
				text: $("#word-cloud-text").val()
			}, {
				success: function() {
					that.$(".loader").remove();
				},
				error: function() {
					that.$(".loader").remove();
				}
			});
			$(".notice").remove();
			$("#answers").remove();
			$("#results").removeClass("form-collapsed");
			var view = new PollrBear.Views.PollCloud({
				model: this.model,
				answer: answer,
				collection: answer.responses()
			});
			$("#results-oe").html(view.render().$el);
		} else {
			this.renderNoticeBefore($("#word-cloud-text"), "Not quite a response, try again");
		}
	},

	selectAnswer: function (event) {
		event.preventDefault();
		var that = this;
		var answerId = $(event.currentTarget).attr("data-answer-id");
		var answer = this.collection.getOrFetch(answerId);
		this.renderLoader($("#poll-wrap"));
		answer.responses().create({
			respondent_id: PollrBear.currentUser.id,
			answer_id: answerId
		}, {
			success: function() {
				that.$(".loader").remove();
			}
		});
		$("#answers").remove();
		$("#results").removeClass("form-collapsed");
		var view = new PollrBear.Views.PollResults({
			model: this.model,
			collection: this.model.answers(),
			userVote: answer
		});
		$("#results-mc").html(view.render().$el);
	},

	dismissNotice: function(event) {
		event.preventDefault();
		$(".notice").remove();
	}
});
