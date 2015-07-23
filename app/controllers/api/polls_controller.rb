module Api
  class PollsController < ApiController
    def index
      @polls = current_user.polls
      render :index
    end

    def info
      @user = User.find(params[:id])

      @data = {}
      @data['responses'] = @user.responses.count
      @data['polls'] = @user.polls.count
      @data['questions'] = @user.questions.count
      @data['answers'] = @user.answers.count
      @data['invites'] = @user.invites.count
      @data['invited_users'] = @user.invited_users.count


      render json: @data
    end

    def report
      @data = {}
      @data['questions'] = []
      @poll = Poll.find(params[:id])
      @poll.questions.each do |question|
        question_data = {}
        question_data['text'] = question.text
        question_data['id'] = question.id
        question_data['num_answers'] =  question.answers.count
        question_data['num_responses'] =  question.responses.count
        question_data['chart'] = question.chart
        question_data['answers'] = []
        question.answers.each do |answer|
          answer_data = {}
          answer_data['text'] = answer.text
          answer_data['id'] = answer.id
          answer_data['num_responses'] = answer.responses.count
        end
        question_data['answers'] << answer_data
      end
      @data['questions'] << question_data

      render json: @data
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
      @poll = Poll.includes(questions: [answers: [responses: :user]]).find(params[:id])
      render :show
    end

    private
    def poll_params
      params.require(:poll).permit(:user_id, :title, :text, :privacy)
    end
  end
end
