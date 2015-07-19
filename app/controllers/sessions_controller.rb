class SessionsController < ApplicationController
  def new
  end

  def show
    current_user_id = @current_user.id
    render json: current_user_id
  end

  def create
    @user = User.find_by_credentials(
    params[:user][:email],
    params[:user][:password])

    if @user
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
