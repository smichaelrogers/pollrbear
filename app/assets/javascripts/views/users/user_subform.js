PollrBear.Views.UserSubform = Backbone.View.extend({
  template: JST['users/subform'],
  tagName: 'div',
  className: 'answer-form-wrapper',

  events: {
    "click .add-answer": "addAnswer",
    "click .close-panel": "closePanel"
  },

  initialize: function(options) {
    this.heading = options.question;
    $('#question-buttons').addClass('collapsed');
    this.render();
  },

  render: function(){
    var html = this.template({
      heading: this.heading
    });
    this.$el.html(html);
    return this;
  },

  addAnswer: function(event) {
    event.preventDefault();
    var text = this.$('.answer-input').val();
    this.$('.answer-list').append("<option name='answer[text]'>" + text + "</option>");
    this.$('.answer-input').val('');
  },

  closePanel: function(event) {
    event.preventDefault();
    var str = "<h6>" + this.heading + "</h6>";

    this.$('option').each(function(index, value) {
      str = str + "<p>" + value.text() + "</p>";
    });

    $('#submitted-answers').append(str);
  }
});
