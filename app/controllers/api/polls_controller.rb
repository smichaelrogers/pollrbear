module Api
  class PollsController < ApiController
    def index
      @polls = current_user.polls
      render json: @polls
    end

    def create
      params[:poll][:user_id] = current_user.id
      @poll = Poll.create!(privacy: params[:poll][:privacy], text: params[:poll][:text], title: params[:poll][:title], user_id: current_user.id)
      params[:questions].values.each do |q_params|
        new_question = Question.create!(chart: q_params[:question][:chart].to_i, format: q_params[:question][:format].to_i, text: q_params[:question][:text], poll_id: @poll.id)
        q_params[:answers].each do |a_text|
          Answer.create!(text: a_text, question_id: new_question.id)
        end
      end

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
      @poll = Poll.includes(questions: [answers: [responses: :respondent]]).find(params[:id])
      render :show
    end

    private

    def poll_params
      params.require(:poll).permit(:user_id, :title, :text, :privacy, :duration)
    end
  end
end
