class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :provider
      t.string :uid
      t.string :session_token
      t.string :password_digest
      t.timestamps null: false
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, [:provider, :uid], unique: true
  end
end
