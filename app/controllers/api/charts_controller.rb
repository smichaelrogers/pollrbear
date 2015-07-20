module Api
  class ChartsController < ApiController
    def create
      @chart = current_question.charts.new(chart_params)
      if @chart.save
        render json: @chart
      else
        render json: @chart.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @charts = current_question.charts
      render json: @charts
    end

    def show
      @chart = Chart.includes(:answers).find(params[:id])
      render :show
    end

    def update
      @chart = chart.find(params[:id])
      if @chart.update_attributes(chart_params)
        render json: @chart
      else
        render json: @chart.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def destroy
      @chart = chart.find(params[:id])
      @chart.destroy
      render json: { message: 'destroyed' }
    end

    private
    def current_question
      if params[:id]
        @chart = Chart.find(params[:id])
        @question = @chart.question
      elsif params[:chart]
        @question = Question.find(params[:chart][:question_id])
      end
    end

    def current_poll
      current_question.poll
    end
    def chart_params
      params.require(:chart).permit(:text, :question_id)
    end
  end
end
