module Api
  class ResponsesController < ApiController
    def index
      @responses = current_answer.responses
      render :index
    end

    def create
      @response = current_answer.responses.new(response_params)
      if @response.save
        render json: @response
      else
        render json: @response.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @response = current_answer.responses.find(params[:id])
      render :show
    end

    def update
      @response = response.find(params[:id])
      if @response.update_attributes(response_params)
        render json: @response
      else
        render json: @response.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def destroy
      @response = Response.find(params[:id])
      @response.destroy
      render json: { message: 'destroyed' }
    end

    private
    def current_answer
      if params[:id]
        @response = Response.find(params[:id])
        @answer = @response.answer
      elsif params[:response]
        @answer = Answer.find(params[:response][:answer_id])
      end
    end

    def responder
      if params[:id]
        @response = Response.find(params[:id])
        @user = @response.user
      elsif params[:response]
        @user = User.find(params[:response][:user_id])
      end
    end

    def current_poll
      current_answer.poll
    end
    def response_params
      params.require(:response).permit(:answer_id, :user_id)
    end
  end
end
