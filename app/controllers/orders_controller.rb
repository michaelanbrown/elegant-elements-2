class OrdersController < ApplicationController
    before_action :find_order, only: [:show, :update]
    before_action :authorize_customer_on_order, only: [:show, :update]

    def index 
        render json: Order.all, status: :ok
    end

    def show
        render json: @order, status: :ok
    end

    def create
        order = Order.create!(order_params)
        render json: order, status: :created
    end

    def update
        @order.update!(update_order_params)
        render json: @order, status: :accepted
    end

    def destroy
        @order.destroy
        head :no_content 
    end

    private

    def order_params
        params.permit(:total).merge(customer_id: @current_customer.id, address_id: Address.where(customer_id: @current_customer.id).first.id)
    end

    def update_order_params
        params.permit(:status, :address_id)
    end
end