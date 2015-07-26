json.array! @questions do |question|
  json.extract! question, :id, :poll_id, :text, :chart, :format, :created_at, :updated_at
end
