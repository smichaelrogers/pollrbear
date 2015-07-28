PollrBear.Collections.Questions = Backbone.Collection.extend({
  model: PollrBear.Models.Question,
  url: '/api/questions',
  initialize: function(models, options) {
    this.poll = options.poll;
  },
  getOrFetch: function(id) {
    var question = this.get(id);
    if (!question) {
      question = new PollrBear.Models.Question({
        id: id
      });
      question.fetch({
        success: function() {
          this.add(question);
        }.bind(this)
      });
    } else {
      question.fetch();
    }
    return question;
  },
  totalPages: function() {
    if(this.total_pages){
      return this.total_pages;
    } else {
      return 1;
    }
  },
  parse: function(response) {
     var resp = {};
     this.page = response.page;
     this.total_pages = response.total_pages;
     resp.models = [];
     resp.total_pages = response.total_pages;
     resp.page = response.page;
     var q;
     response.models.forEach(function(question) {
       q = this.get(question.id);
       resp.models.push(q);
     }.bind(this));
     return resp.models;
   }


});
