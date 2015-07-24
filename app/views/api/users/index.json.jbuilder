json.array! @users do |user|
  json.extract! user, :id, :email, :created_at, :profile_img

  json.polls user.polls do |poll|
    json.extract! poll, :id, :user_id, :title, :text, :created_at, :updated_at
  end

  json.responses user.responses do |response|
    json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
  end
end
