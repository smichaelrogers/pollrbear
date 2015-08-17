PollrBear.Views.UserShow = Backbone.CompositeView.extend({
	template: JST['users/show'],
	className: "row",
	events: {
		"click .sign-out-link": "signOut",
		"click .select-trending-poll": "showTrendingPoll",
		'click .reload-main': 'reloadMain',
		'click .dismiss': 'dismissNotice'
	},

	initialize: function (options) {
		this.users = options.users;
		this.listenTo(this.collection, 'change', this.trends);
		this.listenTo(this.model, 'sync', this.render);
		this.indexView;
	},

	render: function () {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.showUserPolls();
    this.trends();
		return this;
	},

	signOut: function (event) {
		event.preventDefault();
		PollrBear.currentUser.signOut({
			success: function () {
				Backbone.history.navigate("session/new", {
					trigger: true
				});
			}
		});
	},

	reloadMain: function(event) {
		event.preventDefault();
		this.showUserPolls();
	},

	showUserPolls: function () {
		this.indexView = new PollrBear.Views.PollsIndex({
			collection: this.collection,
			model: this.model
		});
		$("#main").html(this.indexView.render().$el);
		this.showPollForm(this.indexView);
	},

	showPollForm: function (parentView) {
		var view = new PollrBear.Views.PollForm({
			collection: this.collection,
			model: this.model,
			parentView: parentView
		});
		$("#new-poll").html(view.render().$el);
	},

	trends: function () {
		var userId = this.model.id;
		var s;
		var that = this;
		this.renderLoader($("#trending"));
		$.ajax({
			url: "/api/polls/trending/" + userId,
			dataType: 'json',
			type: "GET",
			success: function (trending) {
        $("#trending-polls").html("");
				trending.forEach(function (poll) {
					s = "";
					s += "<a class=\"select-trending-poll\" href=\"#\" data-trend-id=\"" + poll[0] + "\"><span class=\"tleft\"><span class=\"trend-num-responses\">" +  poll[1].responses + "</span><span class=\"trend-resp-per-day\"><i class=\"fa fa-caret-up\"></i> " + Math.round(poll[1].frequency) + "</span><span class=\"trend-poll-type\" style=\"color:" + PollrBear.chartColors[poll[1].chart] + ";\"><i class=\"fa " + PollrBear.chartIcons[poll[1].chart] + "\"></i></span></span><span class=\"tright\">" + poll[1].text + "</span></a>";
					$("#trending-polls").append(s);
				});
				that.$(".loader").remove();
			}
		});
	},

	showTrendingPoll: function(event) {
		event.preventDefault();
		var pollId = $(event.currentTarget).attr("data-trend-id");
		var poll = this.collection.getOrFetch(pollId);
		var view = new PollrBear.Views.PollShow({
			model: poll,
			collection: poll.answers(),
			parentView: this.indexView
		});
		this._swapMainView(view);
	},

	dismissNotice: function(event) {
		event.preventDefault();
		$(".notice").remove();
	}
});
