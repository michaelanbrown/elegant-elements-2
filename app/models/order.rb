class Order < ApplicationRecord
    has_many :product_orders
    has_many :products, through: :product_orders

    belongs_to :customer
    belongs_to :address

    validates :shipping, presence: true, numericality: { equal_to: 7.00 }
    validates :status, presence: true
    validate :order_cannot_update, on: :update
    validate :in_progress

    private

    def order_cannot_update
        return if (status == "in progress" || (status == "submitted" && Time.at(created_at.to_i) > Time.at(Time.now-1.day.to_i)))

        if (status == "submitted" && Time.at(created_at.to_i) < Time.at(Time.now-1.day.to_i))
            errors.add(:status, "The order cannot be updated at this time")
        end
    end

    def in_progress
        orders = Order.where(customer_id: customer_id)
        return if (status == "in progress" && orders.find_by(status: "in progress").to_s.length == 0)

        if (status == "in progress" && orders.find_by(status: "in progress").to_s.length > 0)
            errors.add(:status, "You already have an order in progress")
        end
    end
end