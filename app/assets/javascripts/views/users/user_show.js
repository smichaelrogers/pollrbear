PollrBear.Views.UserShow = Backbone.CompositeView.extend({
	template: JST['users/show'],
	className: "row",
	events: {
		"click .sign-out-link": "signOut",
		"click .select-trending-poll": "showTrendingPoll",
		'click .reload-main': 'showUserPolls'
	},
	initialize: function (options) {
		this.users = options.users;
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
		$.ajax({
			url: "/api/polls/trending/" + userId,
			dataType: 'json',
			type: "GET",
			success: function (trending) {
        $("#trending-polls").html("");
				trending.polls.forEach(function (poll) {
					s = "";
					s += "<a class=\"select-trending-poll\" href=\"#\" data-trend-id=\"" + poll.poll.id + "\"><span class=\"tleft\">" +  poll.responses.length + "</span><span class=\"tright\">" + poll.poll.text + "</span></a>";
					$("#trending-polls").append(s);
				});
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
	}
});
