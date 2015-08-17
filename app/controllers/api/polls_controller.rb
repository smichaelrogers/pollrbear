module Api
  class PollsController < ApiController
    def index
      @polls = Poll.order(created_at: :desc).page(params[:page]).per(10)
      @result = []
      now = Time.now.to_f
      @polls.each do |poll|
        pollData = {}
        pollData[:response_count] = 0
        pollData[:answers] = []
        pollData[:format] = poll.format
        pollData[:chart] = poll.chart
        pollData[:text] = poll.text
        pollData[:responses] = []
        pollData[:created_at] = poll.created_at.strftime("Posted %b %d, %Y at %l:%M %p by")
        pollData[:id] = poll.id
        pollData[:user] = "#{poll.user.first_name} #{poll.user.last_name}"
        pollData[:email] = poll.user.email
        pollData[:user_id] = poll.user.id
        pollData[:answers] = poll.answers
        pollData[:responses] = poll.responses
        pollData[:response_count] = poll.responses.length
        pollData[:frequency] = poll.responses.select{|response| now - response.created_at.to_f < 86400.0}.length
        @result << pollData
      end
      render :json => {
        :data => @result,
        :models => @polls,
        :page => params[:page],
        :total_pages => @polls.total_pages
      }
    end

    def trending
      @polls = Poll.trending
      @result = []
      @frequency = {}
      now = Time.now.to_f
      @polls.each do |poll|
        recent = poll.responses.select{|response| now - response.created_at.to_f < 86400.0}
        @frequency[poll.id] = {}
        @frequency[poll.id]['frequency'] = recent.length.to_f
        @frequency[poll.id]['text'] = poll.text
        @frequency[poll.id]['chart'] = poll.chart
        @frequency[poll.id]['responses'] = poll.responses.length
      end
      @result = @frequency.sort_by{|k,v| -v['frequency']}.first(5)
      render json: @result
    end

    def word_cloud
      @poll = Poll.includes(answers: :responses).find(params[:poll_id])
      @words = Hash.new(0)
      @poll.answers.each do |answer|
        answer.responses.each do |response|
          response.text.split.each do |word|
            if word.length > 4
              @words[word] += 1
            end
          end
        end
      end
      render json: @words.sort_by{|k,v| -v}
    end

    def create
      @poll = current_user.polls.new(poll_params)
      @poll.user_id = current_user.id
      if @poll.save
        render json: @poll
      else
        render json: @poll.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @poll = current_user.polls.find(params[:id])
      @poll.try(:destroy)
      render json: {}
    end

    def show
      @poll = Poll.includes(answers: [responses: :respondent]).find(params[:id])
      render :show
    end

    private
    def poll_params
      params.require(:poll).permit(:user_id, :text, :chart, :format, :page, :total_pages)
    end
  end
end
