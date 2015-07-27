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
      render :index
    end

    def show
      @question = Question.includes(answers: :responses).find(params[:id])
      render :show
    end

    def destroy
      @question = Question.find(params[:id])
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

    def question_params
      params.require(:question).permit(:poll_id, :text, :chart, :format)
    end
  end
end
