class CreateProductOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :product_orders do |t|
      t.string :personalization
      t.integer :quantity

      t.timestamps
    end
  end
end
