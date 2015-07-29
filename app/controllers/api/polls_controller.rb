module Api
  class PollsController < ApiController
    def index
      @polls = current_user.polls
      render json: @polls
    end

    def create
      @poll = current_user.polls.new(poll_params)

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
      @poll = Poll.includes(:invites, :votes, answers: [responses: :respondent]).find(params[:id])
      render :show
    end

    private
    def poll_params
      params.require(:poll).permit(:user_id, :text, :chart, :privacy, :format, :duration)
    end
  end
end
