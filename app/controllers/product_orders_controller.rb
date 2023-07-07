class ProductOrdersController < ApplicationController
    before_action :find_product_order, only: [:show, :update, :destroy]

    def index 
        render json: ProductOrder.all, status: :ok
    end

    def show
        render json: @product_order, status: :ok
    end

    def create
        product_order = ProductOrder.create!(product_order_params)
        render json: product_order, status: :created
    end

    def update
        @product_order.update!(update_product_order_params)
        render json: @product_order, status: :accepted
    end

    def destroy
        @product_order.destroy
        head :no_content 
    end

    private

    def product_order_params
        params.permit(:personalization, :quantity, :product_id).merge(order_id: Order.where(status == "in progress" && customer_id == @current_customer.id))
    end

    def update_product_order_params
        params.permit(:personalization, :quantity)
    end
end