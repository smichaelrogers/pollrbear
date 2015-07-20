json.(user, :id, :first_name, :last_name, :email)

json.polls user.polls do |poll|
  json.extract! poll, :id, :user_id, :title, :text, :created_at, :updated_at
    json.questions poll.questions do |question|
      json.extract! question, :id, :poll_id, :text, :created_at, :updated_at
      json.charts question.charts do |chart|
        json.extract! chart, :id, :question_id, :format, :created_at, :updated_at
      end
      json.answers question.answers do |answer|
        json.extract! answer, :id, :question_id, :text, :created_at, :updated_at
        json.responses answer.responses do |response|
          json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
        end
        json.users answer.users do |user|
          json.extract! user, :id, :email, :created_at, :updated_at
        end
      end
    end
  end
end
json.responses user.responses do |response|
  json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
end
json.invites user.invites do |invite|
  json.extract! invite, :id, :poll_id, :user_id, :invitee_id, :created_at, :updated_at
end
json.sent_invites user.sent_invites do |sent_invite|
  json.extract! sent_invite, :id, :poll_id, :user_id, :invitee_id, :created_at, :updated_at
end
json.polls user.polls do |poll|
  json.extract! poll, :id, :user_id, :title, :text, :privacy, :created_at, :updated_at
end
json.follows user.follows do |follow|
  json.extract! follow, :id, :user_id, :follower_id, :created_at, :updated_at
end
json.comments user.comments do |comment|
  json.extract! comment, :id, :commenter_id, :poll_id, :text, :created_at, :updated_at
end
