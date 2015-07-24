json.extract! @user, :id, :email, :created_at, :updated_at, :profile_img

json.polls @user.polls do |poll|
  json.extract! poll, :id, :user_id, :title, :text, :created_at, :updated_at
  json.questions poll.questions do |question|
    json.extract! question, :id, :poll_id, :text, :chart, :created_at, :updated_at
    json.responses question.responses do |response|
      json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
    end
  end
end
