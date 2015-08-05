module Api
  class PollsController < ApiController
    def index
      @polls = Poll.all.page(params[:page]).per(10)
      @result = []
      @polls.each do |poll|
        pollData = {}
        pollData[:response_count] = 0
        pollData[:answers] = []
        pollData[:chart] = poll.chart
        pollData[:format] = poll.format
        pollData[:text] = poll.text
        pollData[:responses] = []
        pollData[:invites] = []
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
        poll.invites.each do |invite|
          pollData[:invites] << invite
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
      @poll = Poll.includes(:invites, :user, answers: [responses: :respondent]).find(params[:id])
      render :show
    end

    private
    def poll_params
      params.require(:poll).permit(:user_id, :text, :chart, :privacy, :format, :duration, :page, :total_pages)
    end
  end
end
