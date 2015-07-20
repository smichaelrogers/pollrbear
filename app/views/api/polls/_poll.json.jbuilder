json.(poll, :id, :user_id, :title, :text, :privacy, :created_at, :updated_at)

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
