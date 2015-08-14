class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email
      t.string :provider
      t.string :uid
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.timestamps null: false
    end
    add_index :users, :session_token, unique: true
    add_index :users, [:provider, :uid], unique: true
  end
end
