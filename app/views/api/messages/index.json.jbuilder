json.array! @messages do |message|
  json.id message.id
  json.content message.content
  json.image message.image
  json.user_name message.user.name
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
end