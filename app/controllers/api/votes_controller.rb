module Api
  class VotesController < ApiController
    def create
      @vote = current_user.votes.new(vote_params)
      @vote.poll_id = params[:poll_id]
      if @vote.save
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @votes = {}
      @votes.poll = Vote.find_by(poll_id: params[:poll_id])
      @votes.user = current_user.votes
      render @votes
    end

    private

    def vote_params
      params.require(:vote).permit(:user_id, :poll_id, :value)
    end
  end
end
