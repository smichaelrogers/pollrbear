module Api
  class QuestionsController < ApiController
    def create
      @question = current_poll.questions.new(question_params)

      if @question.save
        render json: @question
      else
        render json: @question.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @questions = current_poll.questions
      render json: {
        models: @questions,
        page: params[:page],
        total_pages: @questions.total_pages
      }
    end

    def show
      @question = Question.includes(:answers).find(params[:id])
      render :show
    end

    def destroy
      @question = question.find(params[:id])
      @question.destroy
      render json: { message: 'destroyed' }
    end

    private
    def current_poll
      if params[:id]
        @question = Question.find(params[:id])
        @poll = @question.poll
      elsif params[:question]
        @poll = Poll.find(params[:question][:poll_id])
      end
    end

    def current_user
      current_poll.user
    end

    def question_params
      params.require(:question).permit(:poll_id, :text, :chart, :format)
    end
  end
end
