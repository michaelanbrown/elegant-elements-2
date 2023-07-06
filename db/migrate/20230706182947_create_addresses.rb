class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.string :name
      t.string :street
      t.string :unit
      t.string :city
      t.string :state
      t.string :zip
      t.integer :customer_id

      t.timestamps
    end

    add_foreign_key :addresses, :customers, column: :customer_id
    add_index :addresses, :customer_id
  end
end
