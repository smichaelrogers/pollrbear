json.array! @answers do |answer|
  json.extract! answer, :id, :question_id, :text, :created_at, :updated_at
end
