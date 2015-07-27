json.array! @answers do |answer|
  json.extract! answer, :id, :text, :created_at, :updated_at
  json.responses answer.responses do |response|
    json.extract! response, :id, :user_id, :created_at, :updated_at
  end
end
