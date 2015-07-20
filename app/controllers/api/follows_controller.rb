module Api
  class FollowsController < ApiController
    def create
      @follow = current_user.follows.new(follow_params)

      if @follow.save
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @follows = current_user.follows
      render json: @follows
    end

    def show
      @follow = current_user.follows.find(params[:id])
      render :show
    end

    def update
      @follow = Follow.find(params[:id])
      @follow.user_id = current_user.id
      if @follow.update_attributes(follow_params)
        render json: @follow
      else
        render json: @follow.errors.full_messages,
        status: :unprocessable_entity
      end
    end

    def destroy
      @follow = follow.find(params[:id])
      @follow.destroy
      render json: { message: 'destroyed' }
    end

    private
    def follower
      if params[:id]
        @follow = Follow.find(params[:id])
        @user = @follow.user
      elsif params[:follow]
        @user = User.find(params[:follow][:follower_id])
      end
    end

    def follow_params
      params.require(:follow).permit(:user_id, :follower_id)
    end
  end
end
