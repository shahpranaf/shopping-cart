import { prices } from "./pricing";

// Define pricing strategies
interface PricingStrategy {
    calculate(quantity: number, unitPrice: number): number;
}

class RegularPricing implements PricingStrategy {
    calculate(quantity: number, unitPrice: number): number {
        return quantity * unitPrice;
    }
}

class BuyOneGetOneFree implements PricingStrategy {
    calculate(quantity: number, unitPrice: number): number {
        const paidItems = Math.ceil(quantity / 2);
        return paidItems * unitPrice;
    }
}

class ThreeForTwo implements PricingStrategy {
    calculate(quantity: number, unitPrice: number): number {
        const groupsOfThree = Math.floor(quantity / 3);
        const remainingItems = quantity % 3;
        return (groupsOfThree * 2 + remainingItems) * unitPrice;
    }
}

// Define pricing rules
const pricingRules: Record<string, PricingStrategy> = {
    Apple: new RegularPricing(),
    Banana: new RegularPricing(),
    Melon: new BuyOneGetOneFree(),
    Lime: new ThreeForTwo(),
};

/**
 * Calculate the total cost of items in a shopping basket
 * @param basket Array of item names
 * @returns Total cost in paise
 * @throws Error if basket contains unknown items
 */
export const calculateTotal = (basket: string[]): number => {
    if (!basket || !Array.isArray(basket)) {
        throw new Error("Basket must be a non-empty array");
    }

    if (basket.length === 0) {
        return 0;
    }

    // Validate all items exist in pricing
    const unknownItems = basket.filter(item => !(item in prices));
    if (unknownItems.length > 0) {
        throw new Error(`Unknown items found: ${unknownItems.join(', ')}`);
    }

    // Count items
    const itemCount = basket.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Calculate total using pricing strategies
    let total = 0;
    for (const [item, quantity] of Object.entries(itemCount)) {
        const unitPrice = prices[item];
        const pricingStrategy = pricingRules[item];

        if (pricingStrategy) {
            total += pricingStrategy.calculate(quantity, unitPrice);
        } else {
            // Fallback to regular pricing for items without special rules
            total += quantity * unitPrice;
        }
    }

    return total;
};

// Example usage
const basket = ["Apple", "Banana", "Melon", "Lime", "Lime", "Melon", "Lime"];

try {
    const total = calculateTotal(basket);
    console.log(`Total cost: Rs ${(total / 100).toFixed(2)}`);
} catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error calculating total: ${errorMessage}`);
}
