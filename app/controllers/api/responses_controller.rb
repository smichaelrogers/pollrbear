module Api
  class ResponsesController < ApiController
    def create
      @responses = []
      params[:response].values.uniq.each do |answer_id|
        @responses << Response.create(user_id: current_user.id, answer_id: answer_id.to_i)
      end

      if @responses.all? {|response| response.save}
        render json: @responses
      else
        render json: @responses.errors.full_messages, status: :unprocessable_entity
      end
    end

    def responses_by_user
      @polls = Poll.all
      @responses = []
      @polls.each do |poll|
        next unless poll.questions
        poll.questions.each do |question|
          next unless question.answers
          question.answers.each do |answer|
            next unless answer.responses
            answer.responses.each do |response|
              next unless response.respondent || response.user_id == poll.user_id
              current = response.respondent

              @responses << { response: response,
                              respondent: current,
                              poll: poll,
                              question: question,
                              answer: answer,
                              created_by: poll.user}
            end
          end
        end
      end
      render json: @responses
    end

    def index
      @responses = current_user.responses
      render json: @responses
    end

    private
    def response_params
      params.require(:response).permit(:poll_id, :user_id, response: [])
    end
  end
end
