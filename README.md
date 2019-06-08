# DB設計
## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: true|
|image|string|null: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through groups_users

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

- deviseで実装する為、追加するカラムのみ記述
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through groups_users
- インデックスを貼る add_index :users, user_name

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user