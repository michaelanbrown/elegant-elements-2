class Addproductidtoproducts < ActiveRecord::Migration[6.1]
  def change
    add_reference :product_orders, :product, null: false, foreign_key: true
  end
end
