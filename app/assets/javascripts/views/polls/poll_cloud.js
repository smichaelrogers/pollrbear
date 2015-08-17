PollrBear.Views.PollCloud = Backbone.CompositeView.extend({
	template: JST['polls/cloud'],
	initialize: function (options) {
		this.listenTo(this.collection, 'sync', this.render);
		this.answer = options.answer;
		this.colors = [
      "rgba(42, 183, 201, 1.0)",
      "rgba(254,215,101, 1.0)",
      "rgba(254,74,73, 1.0)",
      "rgba(51,138,150, 1.0)",
      "rgba(255,231,162, 1.0)",
      "rgba(235, 120, 120, 1.0)",
      "rgba(0,225,255, 1.0)",
      "rgba(246,186,11, 1.0)",
      "rgba(176,47,47,1.0)"
    ];
	},
	render: function () {
		var content = this.template({
			poll: this.model,
			responses: this.collection,
			labels: this.labels
		});
		this.$el.html(content);
		this.generateWordCloud();
		return this;
	},

	generateWordCloud: function () {
		var that = this;
		var pollId = this.model.id;
		var answerId = this.answer.id;
		var s;
		var userId = PollrBear.currentUser.id;
		this.renderLoader(this.$el);
		$.ajax({
			url: "/api/polls/cloud/" + pollId,
			data: {
				answer_id: answerId,
				user_id: userId,
				poll_id: pollId
			},
			dataType: 'json',
			type: "GET",
			success: function (wordData) {
				if (wordData.length < 3) {
					return;
				}
				$("#cloud-container").html("");
				var htmlStr, numWords, words, str, val, dir, words;
				var idx = 1;
				var cloudData = [];
				var most = wordData[0][1];
				if (wordData.length > 100) {
					words = wordData.slice(0, 100);
					numWords = 100;
				} else {
					words = wordData;
					numWords = words.length;
				}
				words.forEach(function (word) {
					htmlStr = "";
					str = word[0];
					val = word[1];
					if (idx % 4 === 0 || idx % 5 === 0 || idx % 7 === 0 || idx === 1) {
						dir = "cloud-left";
					} else {
						dir = "cloud-right";
					}
					var n = Math.floor(8 + (Math.pow(val / most, 2) * 100)) + "";
					styleStr = "margin-top: -" + (n * 0.7) + "px; z-index: " + val + ";";
					htmlStr += "<span class=\" cloud cloud-" + Math.floor(idx / numWords * 16.0 + 1.0) + " " + dir + "\" style=\"font-size:" + n + "px;" + styleStr + "\">" + str + "</span>";
					cloudData.push(htmlStr);
					idx++;
				});
				for (var i = cloudData.length - 1; i > 0; i = i - 2) {
					$("#cloud-container").append(cloudData[i]);
				}
				var n = 1;
				if (cloudData.length % 2 === 0) {
					n = 0;
				}
				for (var i = n; i < cloudData.length - 1; i += 2) {
					$("#cloud-container").append(cloudData[i]);
				}
				that.$(".loader").remove();
			}
		});
	}

});
