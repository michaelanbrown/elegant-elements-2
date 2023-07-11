class Order < ApplicationRecord
    has_many :product_orders, dependent: :destroy
    has_many :products, through: :product_orders

    belongs_to :customer
    belongs_to :address

    validates :shipping, presence: true, numericality: { equal_to: 7.00 }
    validates :status, presence: true
    validate :in_progress, on: [:create]

    private

    def in_progress
        orders = Order.where(customer_id: customer_id)
        return if (status == "in progress" && orders.find_by(status: "in progress").to_s.length == 0)

        if (status == "in progress" && orders.find_by(status: "in progress").to_s.length > 0)
            errors.add(:status, "You already have an order in progress")
        end
    end
end