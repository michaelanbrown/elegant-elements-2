class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :customer_id
      t.float :total
      t.float :shipping, default: 7.00
      t.string :status, default: "in progress"
      t.integer :address_id

      t.timestamps
    end

    add_foreign_key :orders, :customers, column: :customer_id
    add_index :orders, :customer_id

    add_foreign_key :orders, :addresses, column: :address_id
    add_index :orders, :address_id
  end
end
