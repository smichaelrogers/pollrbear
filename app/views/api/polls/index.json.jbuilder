json.array! @polls do |poll|
  json.extract! poll, :id, :user_id, :title, :text, :privacy, :duration, :created_at, :updated_at
  json.questions poll.questions do |question|
    json.extract! question, :id, :poll_id, :text, :chart, :format, :created_at, :updated_at
    json.answers question.answers do |answer|
      json.extract! answer, :id, :question_id, :text, :created_at, :updated_at
      json.responses answer.responses do |response|
        json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
      end
    end
  end
end
