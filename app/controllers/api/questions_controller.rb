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
      current = Poll.find(params[:question][:poll_id])
      @questions = current_poll.questions
      render json: @questions
    end

    def show
      @question = Question.includes(:charts, answers: :responses).find(params[:id])
      render :show
    end


    def update
      @question = Question.find(params[:id])
      if @question.update_attributes(question_params)
        render json: @question
      else
        render json: @question.errors.full_messages,
               status: :unprocessable_entity
      end
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

    def question_params
      params.require(:question).permit(:poll_id, :text)
    end
  end
end
