class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.includes(:submitted_responses, polls: [answers: [responses: :respondent]]).find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  protected

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :profile_img)
  end
end
