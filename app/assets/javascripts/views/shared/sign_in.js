PollrBear.Views.SignIn = Backbone.View.extend({

	initialize: function (options) {
		this.user = new PollrBear.users.model();
		this.callback = options.callback;
		this.listenTo(PollrBear.currentUser, "signIn", this.signInCallback);
	},

	events: {
		"click #standard-login": "standardLogin",
		"click #guest-login": "guestLogin",
		"click #twitter-login": "twitterLogin",
		"click #register-login": "registerLogin",
		'click .notice-dismiss': 'noticeDismiss'
	},

	template: JST['shared/sign_in'],

	render: function () {
		this.$el.html(this.template());

		return this;
	},

	standardLogin: function (event) {
		event.preventDefault();
		var $notice = this.$(".notice-login");
		var $form = $(".login-form");
		var formData = $form.serializeJSON().user;

		PollrBear.currentUser.signIn({
			email: formData.email,
			password: formData.password,
			error: function () {
				$notice.addClass("notice-flash").html("<span class=\"notice-text\">Please enter a valid username and/or password</span> <a href=\"#\" class=\"notice-dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>");
			}
		});
	},

	guestLogin: function (event) {
		event.preventDefault();
		PollrBear.currentUser.signIn({
			email: "wilson@tom.hanks",
			password: "asdfasdf",
		});
	},

	signInCallback: function (event) {
		if (this.callback) {
			this.callback();
		} else {
			Backbone.history.navigate("", {
				trigger: true
			});
		}
	},

	registerLogin: function (event) {
		event.preventDefault();
		var $form = $(".signup-form");
		var that = this;
		var userData = $form.serializeJSON().user;
		var $notice = this.$(".register-notice");
		this.user.set(userData);
		this.user.save({}, {
			success: function () {
				PollrBear.currentUser.fetch();
        PollrBear.users.add(that.user, {merge:true});
				Backbone.history.navigate("", {
					trigger: true
				});
			},
			error: function (data) {
				$notice.addClass("notice-flash").html("<span class=\"notice-text\">Something went wrong...</span> <a href=\"#\" class=\"notice-dismiss\"><i class=\"fa fa-lg fa-times\"></i></a>");
			}
		});
	},
	noticeDismiss: function (event) {
		event.preventDefault();
		$(".notice").removeClass("notice-flash").html("");
	}

});
