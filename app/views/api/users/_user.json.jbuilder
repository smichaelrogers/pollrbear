json.(user, :id, :first_name, :last_name, :email, :profile_img)
json.invites user.invites do |invite|
  json.extract! invite, :id, :user_id, :poll_id, :created_at
  json.poll invite.poll, :id, :user_id, :text, :privacy, :duration, :chart, :format, :created_at
end

json.polls user.polls do |poll|
  json.extract! poll, :id, :user_id, :text, :privacy, :duration, :chart, :format, :created_at
  # json.user poll.user, :id, :first_name, :last_name, :email, :profile_img
  # json.answers poll.answers do |answer|
  #   json.extract! answer, :id, :poll_id, :text, :created_at
  #   json.responses answer.responses do |response|
  #     json.extract! response, :id, :respondent_id, :answer_id, :created_at
  #     json.respondent response.respondent, :id, :email, :first_name, :last_name, :created_at
  #   end
  # end
  json.invites poll.invites do |invite|
    json.extract! invite, :id, :user_id, :poll_id, :created_at
  end
end
