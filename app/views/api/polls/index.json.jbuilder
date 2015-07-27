json.array! @polls do |poll|
  json.extract! poll, :id, :user_id, :title, :text, :privacy, :duration, :created_at, :updated_at
end
