json.(poll, :id, :user_id, :text, :privacy, :duration, :chart, :format, :created_at)
json.poll do
  json.answers poll.answers do |answer|
    json.extract! answer, :id, :poll_id, :text, :created_at
    json.responses answer.responses do |response|
      json.extract! response, :id, :answer_id, :respondent_id, :created_at
    end
  end
  json.votes poll.votes do |vote|
    json.extract! vote, :id, :user_id, :value, :created_at
  end
  json.invites poll.invites do |invite|
    json.extract! invite, :id, :user_id, :created_at
  end
end
