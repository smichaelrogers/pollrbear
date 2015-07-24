
json.array! @questions do |question|
  json.answers question.answers do |answer|
    json.extract! answer, :id, :question_id, :text, :created_at, :updated_at
  end
  json.responses question.responses do |response|
    json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
  end
end
