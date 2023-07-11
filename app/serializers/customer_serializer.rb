class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password_digest, :product_orders, :in_progress_product_count, :admin, :orders

  has_many :orders
  has_many :addresses

  def product_orders
    @product_orders = object.orders.map{|o| o.product_orders}.flatten
    
    @product_orders.uniq{|po| [po.personalization, po.product_id]}
  end

  def in_progress_product_count
    @in_progess_order = Order.where(status: "in progress", customer_id: object.id)
    @in_progess_order.map{ |o| o.id }
    ProductOrder.where(order_id: @in_progess_order).count
  end
end
