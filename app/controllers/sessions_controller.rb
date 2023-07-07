class SessionsController < ApplicationController
    skip_before_action :authenticate_customer

    def create
        customer = Customer.find_by_username(params[:username])
        if customer&.authenticate(params[:password])
          session[:customer_id] = customer.id
          render json: customer, status: :ok
        else 
          render json: { errors: "Invalid Credentials" }, status: :unauthorized
        end
    
      end
    
      def destroy
        session.delete(:customer_id)
      end
end