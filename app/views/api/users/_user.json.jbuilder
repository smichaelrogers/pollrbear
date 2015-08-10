json.(user, :id, :first_name, :last_name, :email)
json.polls user.polls do |poll|
  json.extract! poll, :id, :user_id, :text, :duration, :chart, :format, :created_at
end
