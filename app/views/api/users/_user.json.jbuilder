json.(user, :id, :first_name, :last_name, :email)
json.polls user.polls do |poll|
  json.extract! poll, :id, :user_id, :text, :chart, :format, :created_at
  json.answers poll.answers do |answer|
    json.extract! answer, :id, :poll_id, :text, :created_at
    json.responses answer.responses do |response|
      json.extract! response, :id, :answer_id, :text, :respondent_id, :created_at
    end
  end
end
