module Api
  class PollsController < ApiController
    def index
      @polls = Poll.order(created_at: :desc).page(params[:page]).per(8)
      @result = []
      @polls.each do |poll|
        pollData = {}
        pollData[:response_count] = 0
        pollData[:answers] = []
        pollData[:format] = poll.format
        pollData[:text] = poll.text
        pollData[:responses] = []
        time_left = (Time.now.to_i - poll.created_at.to_i + poll.duration) / 3600.0
        if time_left >= 2.0
          pollData[:expires_in] = "ends in #{time_left.to_i.to_s} hours"
        elsif  time_left > 1.0
          pollData[:expires_in] = "ends in less than two hours"
        elsif time_left > 0.0
          pollData[:expires_in] = "ends in less than an hour"
        else
          pollData[:expires_in] = "this poll has ended"
        end
        pollData[:created_at] = poll.created_at.strftime("Posted %b %d, %Y at %l:%M %p by")
        pollData[:id] = poll.id
        pollData[:user] = "#{poll.user.first_name} #{poll.user.last_name}"
        pollData[:email] = poll.user.email
        pollData[:user_id] = poll.user.id
        poll.answers.each do |answer|
          pollData[:answers] << answer
          answer.responses.each do |response|
            pollData[:responses] << response
            pollData[:response_count] += 1
          end
        end
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
      @data = {}
      @data[:polls] = []
      5.times do |idx|
        poll_data = {}
        poll_data[:poll] = @polls[idx]
        poll_data[:answers] = []
        poll_data[:responses] = []
        @polls[idx].answers.each do |answer|
          poll_data[:answers] << answer
          answer.responses.each do |response|
            poll_data[:responses] << response
          end
        end
        @data[:polls] << poll_data
      end

      render json: @data
    end

    def word_cloud
      @poll = Poll.includes(answers: :responses).find(params[:id])
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
      params.require(:poll).permit(:user_id, :text, :chart, :format, :duration, :page, :total_pages)
    end
  end
end
