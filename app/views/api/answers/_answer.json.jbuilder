json.call(answer, :id, :text, :poll_id, :created_at)
json.answer do
  json.responses answer.responses do |response|
    json.extract! response, :id, :respondent_id, :created_at, :updated_at
  end
end
