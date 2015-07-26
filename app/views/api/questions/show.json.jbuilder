
json.extract! @question, :id, :poll_id, :text, :chart, :format, :created_at, :updated_at
json.answers @question.answers do |answer|
  json.extract! answer, :id, :question_id, :text, :created_at, :updated_at
end
