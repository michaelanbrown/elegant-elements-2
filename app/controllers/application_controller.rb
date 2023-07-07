class ApplicationController < ActionController::API

  before_action :authenticate_customer

  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def current_customer
    @current_customer ||= Customer.find_by(id: session[:customer_id])
  end
private

  def authenticate_customer
    render json: { errors: "Not authorized" }, status: :unauthorized unless current_customer
  end

  def find_product
    @product = Product.find(params[:id])
  end

  def find_order
    @order = Order.find(params[:id])
  end

  def find_product_order
    @product_order = ProductOrder.find(params[:id])
  end

  def find_address
    @address = Address.find(params[:id])
  end

  def authorize_customer_on_order
    find_order
    permitted = @order.customer_id == @current_customer.id || @current_customer.admin == true
    render json: { errors: "Not authorized" }, status: :unauthorized unless permitted
  end


  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { error: "Record not found" }, status: :not_found
  end

end