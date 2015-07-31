json.(user, :id, :first_name, :last_name, :email, :profile_img)
json.extract! user, :id, :first_name, :last_name, :email, :profile_img

json.invites user.invites do |invite|
  json.extract! invite, :id, :user_id, :poll_id, :created_at
end

json.submitted_responses user.submitted_responses do |submitted_response|
  json.extract! submitted_response, :id, :answer_id, :respondent_id, :created_at
end
json.votes user.votes do |vote|
  json.extract! vote, :id, :user_id, :poll_id, :value, :created_at
end

json.polls user.polls do |poll|
  json.extract! poll, :id, :user_id, :text, :privacy, :duration, :chart, :format, :created_at
  json.answers poll.answers do |answer|
    json.extract! answer, :id, :poll_id, :text, :created_at
    json.responses answer.responses do |response|
      json.extract! response, :id, :respondent_id, :answer_id, :created_at
      json.respondent response.respondent, :id, :email, :first_name, :last_name, :created_at
    end
  end
  json.votes poll.votes do |vote|
    json.extract! vote, :id, :user_id, :poll_id, :value, :created_at
  end
  json.invites poll.invites do |invite|
    json.extract! invite, :id, :user_id, :poll_id, :created_at
  end
end
