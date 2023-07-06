class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :password_digest, :products, :in_progress_product_count, :admin

  has_many :orders
  has_many :addresses

  def products
    @order_ids = object.orders.map{ |o| o.id }
    @product_arrays = @order_ids.map { |o| Product.where(order_id: o)}
    @prods = []
    @product_arrays.map{|p| p.map{|p| @prods.push(p)}}
    @prods.each{|p| p.jewelry = p.jewelry.capitalize}.uniq{|p| p.jewelry && p.customization.personalization}
  end

  def in_progress_product_count
    @in_progess_order = Order.where(status: "in progress", customer_id: object.id)
    @in_progess_order.map{ |o| o.id }
    Product.where(order_id: @in_progess_order).count
  end
end
