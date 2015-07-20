class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :poll_id, null: false
      t.string :text, null: false
      t.integer :chart_type, default: 1

      t.timestamps null: false
    end
    add_index :questions, :poll_id
    add_index :questions, :chart_type
  end
end
