class CreateProductOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :product_orders do |t|
      t.string :personalization
      t.integer :quantity
      t.integer :order_id
      t.integer :product_id

      t.timestamps
    end
    
    add_foreign_key :product_orders, :products, column: :product_id
    add_index :orders, :product_id

    add_foreign_key :product_orders, :orders, column: :order_id
    add_index :orders, :order_id
  end
end
