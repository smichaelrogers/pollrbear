class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :question_id, null: false
      t.integer :chart_id, null: false
      t.string :text, null: false

      t.timestamps null: false
    end
    add_index :answers, :question_id
    add_index :answers, :chart_id
  end
end
