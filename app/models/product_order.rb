class ProductOrder < ApplicationRecord
    belongs_to :product
    belongs_to :order

    validates :quantity, numericality: { greater_than: 0 }
    validates :personalization, presence: true
    validate :word_personalization
    validate :phrase_personalization
    validate :date_personalization

    private

    def word_personalization
        return if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && personalization.index(" ").to_i < 0 && personalization.slice(2) != "." && personalization.slice(5) != ".")

        if ((product.jewelry == "Necklace with a Word" || product.jewelry == "Bracelet with a Word" || product.jewelry == "Keychain with a Word") && (personalization.index(" ") || personalization.slice(2) == "." || personalization.slice(5) == "."))
            errors.add(:personalization, "Needs to be a single word")
        end
    end

    def phrase_personalization
        return if ((product.jewelry == "Necklace with a Phrase" || product.jewelry == "Bracelet with a Phrase" || product.jewelry == "Keychain with a Phrase") && personalization.index(" ").to_i > 0)

        if ((product.jewelry == "Necklace with a Phrase" || product.jewelry == "Bracelet with a Phrase" || product.jewelry == "Keychain with a Phrase") && personalization.index(" ").to_i < 1)
            errors.add(:personalization, "Needs to be multiple words")
        end
    end

    def date_personalization
        return if ((product.jewelry == "Necklace with a Date" || product.jewelry == "Bracelet with a Date" || product.jewelry == "Keychain with a Date") && personalization.slice(2) == "." && personalization.slice(5) == ".")

        if ((product.jewelry == "Necklace with a Date" || product.jewelry == "Bracelet with a Date" || product.jewelry == "Keychain with a Date") && (personalization.slice(2) != "." || personalization.slice(5) != "."))
            errors.add(:personalization, "Needs to be a date")
        end
    end
end
