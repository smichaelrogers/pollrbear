module Api
  class ApiController < ApplicationController
    before_action :require_login!

    def require_login!
      unless signed_in?
        render json: ["You must be signed in to perform that action"], status: :unauthorized
      end
    end
  end
end
