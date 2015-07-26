json.extract! @user, :id, :first_name, :last_name, :email, :profile_img, :created_at, :updated_at

json.polls @user.polls do |poll|
  json.extract! poll, :id, :user_id, :title, :text, :privacy, :duration, :created_at, :updated_at
end
