module Api
  class AnswersController < ApiController
    def index
      @answers = current_question.answers
      render json: @answers
    end

    def create
      @answer = current_question.answers.new(answer_params)
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

    def update
      @answer = Answer.find(params[:id])
      if @answer.update_attributes(answer_params)
        render json: @answer
      else
        render json: @answer.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def destroy
      @answer = Answer.find(params[:id])
      @answer.destroy
      render json: { message: 'destroyed' }
    end

    private

    def current_question
      if params[:id]
        @answer = Answer.find(params[:id])
        @question = @answer.question
      elsif params[:answer]
        @question = Question.find(params[:answer][:question_id])
      end
    end

    def current_poll
      current_question.poll
    end

    def answer_params
      params.require(:answer).permit(:text, :question_id)
    end
  end
end
