class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password_digest, :personalizations, :admin, :orders

  has_many :orders
  has_many :addresses

  def personalizations
    @personalizations = []
    object.orders.each{ |o| @personalizations.push(ProductOrder.where(order_id: o.id)) }
    @personalizations.flatten
  end

  # def in_progress_product_count
  #   @in_progess_order = Order.where(status: "in progress", customer_id: object.id)
  #   @in_progess_order.map{ |o| o.id }
  #   Product.where(order_id: @in_progess_order).count
  # end
end
