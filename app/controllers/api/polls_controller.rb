module Api
  class PollsController < ApiController
    def index
      @polls = current_user.polls
      render :index
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
      @poll = Poll.includes(questions: [answers: [responses: :users]]).find(params[:id])
      render :show
    end

    private
    def poll_params
      params.require(:poll).permit(:user_id, :title, :text, :privacy)
    end
  end
end
