require 'stripe'

class ChargesController < ApplicationController

  def create

    Stripe.api_key = ENV['stripe_api_key']

    begin

    @line_items = params[:items].map{|i| {
        price: i[:stripe_key],
        quantity: i[:quantity]
    }}

    session = Stripe::Checkout::Session.create({
      line_items: @line_items,
      mode: 'payment',
      success_url: "http://elegant-elements-jewelry-store.onrender.com/success",
      cancel_url: "https://elegant-elements-jewelry-store.onrender.com/cancel"
    })
    render json: {url: session.url, message: session}, status: :ok
    
    rescue Stripe::CardError => e
        render json: { message: 'oops' }, status: :not_acceptable
    end
  end
end