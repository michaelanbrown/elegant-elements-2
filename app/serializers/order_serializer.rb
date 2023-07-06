class OrderSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :total, :shipping, :status, :address_id, :editable, :created_at, :updated_at
  has_many :products
  has_many :product_orders

  belongs_to :customer
  belongs_to :address

  def total
    @product_total = object.product_orders.map{|o| o.quantity * Product.find(o.product_id).price}
    @product_total.sum + object.shipping
  end

  def editable
    if object.status == "in progress" || (object.status == "submitted" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i))
      return true
    else
      return false
    end
  end

  def created_at
    object.created_at.strftime("%B %Y")
  end

  def updated_at
    object.created_at.strftime("%B %Y")
  end
end
