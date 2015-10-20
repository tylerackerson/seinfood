class Order < ActiveRecord::Base
  validate :user_id, :restaurant_id, :type, :subtotal, :delivery_fee, presence: true

  belongs_to :user
  belongs_to :restaurant
end