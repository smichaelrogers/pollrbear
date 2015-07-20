json.(poll, :id, :user_id, :title, :text, :privacy, :created_at, :updated_at)

json.questions poll.questions do |question|
  json.extract! question, :id, :poll_id, :text, :chart_type, :created_at, :updated_at
  json.answers question.answers do |answer|
    json.extract! answer, :id, :question_id, :text, :created_at, :updated_at
    json.responses answer.responses do |response|
      json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
    end
  end
  json.users question.users do |user|
    json.extract! user, :id, :first_name, :last_name, :email
  end
end
