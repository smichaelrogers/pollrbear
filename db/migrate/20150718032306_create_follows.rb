class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :follower_id, null: false
      t.integer :value, default: 0, null: false
      t.integer :followable_id, null: false
      t.string :followable_type, null: false

      t.timestamps null: false
    end
    add_index :follows, [:followable_id, :followable_type]
    add_index :follows, [:user_id, :followable_id, :followable_type], unique: true
  end
end
