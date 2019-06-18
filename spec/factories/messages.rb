FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("/Users/yamaguchitakahiro/Public/Drop Box/2.png")}
    user
    group
  end
end