class ProductOrder < ApplicationRecord
    belongs_to :product
    belongs_to :order

    validate :word_personalization

    private

    def word_personalization
        return if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && personalization.index(" ").to_i < 0)

        if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && personalization.index(" "))
            errors.add(:personalization, "Cannot be multiple words")
        end
    end

    def phrase_personalization
        return if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && personalization.index(" ").to_i < 0)

        if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && personalization.index(" "))
            errors.add(:personalization, "Cannot be multiple words")
        end
    end

    def date_personalization
        return if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && personalization.index(" ").to_i < 0)

        if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && personalization.index(" "))
            errors.add(:personalization, "Cannot be multiple words")
        end
    end
end
