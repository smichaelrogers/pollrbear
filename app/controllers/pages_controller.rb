class PagesController < ApplicationController
  before_action :require_login!

  def root
  end
end
