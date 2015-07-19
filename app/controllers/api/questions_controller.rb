module Api
  class QuestionsController < ApiController
    def create
      @question = Question.create(content: params["question"]["content"], poll_id: params["question"]["poll_id"])
      q_id = @question.id
      @display = params["graph"]["display"]
      @graph = Graph.create!(display: @display, question_id: q_id)
      @arr = []
      if params["answer_array"]
        params["answer_array"].each do |ans|
          @arr << Answer.create!(text: ans, question_id: q_id)
        end
      end

      if @question.save && @arr.all?{|ans| ans.save} && @graph.save
        render json: @question
      else
        render json: @question.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      current = Poll.find(params[:question][:poll_id])
      @questions = current.questions
      render json: @questions
    end

    def show
      @question = Question.includes(:graphs, poll: :participants, answers: :responses).find(params[:id])
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
      params.require(:question).permit(:poll_id, :text, :content, :context, graph: :display, answer_array: [])
    end
  end
end
