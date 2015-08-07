json.(user, :id, :first_name, :last_name, :email, :profile_img)
json.polls user.polls do |poll|
  json.extract! poll, :id, :user_id, :text, :privacy, :duration, :chart, :format, :created_at
end
