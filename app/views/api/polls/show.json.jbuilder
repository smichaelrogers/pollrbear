json.extract! @current_user, :id, :email, :created_at, :updated_at
json.responses @current_user.responses do |response|
  json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
end
json.comments @current_user.comments do |comment|
  json.extract! comment, :id, :commenter_id, :poll_id, :parent_id, :text, :created_at, :updated_at
end

json.questions @poll.questions do |question|
  json.extract! question, :id, :poll_id, :text, :created_at, :updated_at
  json.charts question.charts do |chart|
    json.extract! chart, :id, :question_id, :format, :created_at, :updated_at
  end
  json.answers question.answers do |answer|
    json.extract! answer, :id, :question_id, :chart_id, :text, :created_at, :updated_at
    json.responses answer.responses do |response|
      json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
    end
    json.users answer.users do |user|
      json.extract! user, :id, :email, :created_at, :updated_at
    end
  end
end

json.comments @poll.comments do |comment|
  json.extract! comment, :id, :poll_id, :user_id, :text, :created_at, :updated_at
end

json.invites @poll.invites do |invite|
  json.extract! invite, :id, :poll_id, :user_id, :invitee_id, :created_at, :updated_at
end
