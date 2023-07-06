class OrderSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :total, :shipping, :status, :address_id
  has_many :products
  has_many :product_orders

  belongs_to :customer
  belongs_to :address

  def total
    @product_total = object.product_orders.map{|o| o.quantity * Product.find(o.product_id).price}
    @product_total.sum + object.shipping
  end
end
