PollrBear.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(PollrBear.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit",
    "click #guest-login": "guestLogin"
  },

  template: JST['shared/sign_in'],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $errors = this.$(".errors");
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    PollrBear.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        $errors.addClass("errors-flash").text("Please enter a valid username and/or password");
        window.setTimeout(function() {
          $errors.removeClass("errors-flash").text("");
        }, 2500);
      }
    });
  },

  guestLogin: function(event) {
    event.preventDefault();
    PollrBear.currentUser.signIn({
      email: "wilson@tom.hanks",
      password: "asdfasdf",
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

});
