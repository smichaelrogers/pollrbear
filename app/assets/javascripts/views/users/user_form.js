PollrBear.Views.UserForm = Backbone.View.extend({
  template: JST['users/form'],

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
  },

  events: {
    "submit form": "submit"
  },

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;
    this.model.set(userData);
    this.model.save({}, {
      success: function(){
        PollrBear.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      },
      error: function(data){
        alert("invalid");
      }
    });
  }

});
