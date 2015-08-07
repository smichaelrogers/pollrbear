module Api
  class AnswersController < ApiController
    def index
      @answers = current_poll.answers
      render json: @answers
    end

    def create
      @answer = current_poll.answers.new(answer_params)
      if @answer.save
        render json: @answer
      else
        render json: @answer.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @answer = Answer.includes(responses: :respondent).find(params[:id])
      render :show
    end

    private

    def current_poll
      if params[:id]
        @answer = Answer.find(params[:id])
        @poll = @answer.poll
      elsif params[:answer]
        @poll = Poll.find(params[:answer][:poll_id])
      end
    end

    def answer_params
      params.require(:answer).permit(:text, :poll_id)
    end
  end
end
