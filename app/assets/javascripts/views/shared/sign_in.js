PollrBear.Views.SignIn = Backbone.CompositeView.extend({

	initialize: function (options) {
		this.user = new PollrBear.users.model();
		this.callback = options.callback;
		this.listenTo(PollrBear.currentUser, "signIn", this.signInCallback);
	},

	events: {
		"click #standard-login": "standardLogin",
		"click #guest-login": "guestLogin",
		"click #twitter-login": "twitterLogin",
		"click #register-login": "registerLogin"
	},

	template: JST['shared/sign_in'],

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	standardLogin: function (event) {
		event.preventDefault();
		$(".notice").remove();
		var $form = $(".login-form");
		var formData = $form.serializeJSON().user;
		var that = this;
		PollrBear.currentUser.signIn({
			email: formData.email,
			password: formData.password,
			error: function () {
				that.renderNotice($form, "Invalid username and/or password")
			}
		});
	},

	guestLogin: function (event) {
		event.preventDefault();
		$(".notice").remove();
		PollrBear.currentUser.signIn({
			email: "guest@guest.com",
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
		$(".notice").remove();
		var $form = $(".signup-form");
		var that = this;
		var userData = $form.serializeJSON().user;
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
				that.renderNotice($form, "Invalid username and/or password")
			}
		});
	}
});
