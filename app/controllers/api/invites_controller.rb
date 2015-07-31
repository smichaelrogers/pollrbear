module Api
  class InvitesController < ApiController
    def create
      @invite = current_user.invites.new(invite_params)

      if @invite.save
        render json: @invite
      else
        render json: @invite.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @invites = current_user.invites
      render :index
    end

    def destroy
      @invite = Invite.find(params[:id])
      @invite.destroy
      render json: { message: 'destroyed' }
    end

    private

    def invite_params
      params.require(:invite).permit(:user_id, :poll_id)
    end
  end
end
