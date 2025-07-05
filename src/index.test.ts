import { calculateTotal } from "./index";

describe('Shopping Cart - calculateTotal', () => {
    describe('Empty basket', () => {
        test('should return 0 for empty basket', () => {
            expect(calculateTotal([])).toBe(0);
        });
    });

    describe('Single items', () => {
        test('should calculate correct total for single Apple', () => {
            expect(calculateTotal(['Apple'])).toBe(35);
        });

        test('should calculate correct total for single Banana', () => {
            expect(calculateTotal(['Banana'])).toBe(20);
        });

        test('should calculate correct total for single Melon (BOGO)', () => {
            expect(calculateTotal(['Melon'])).toBe(50);  // Full price for less than 2
        });

        test('should calculate correct total for single Lime (3-for-price-of-2)', () => {
            expect(calculateTotal(['Lime'])).toBe(15); // Full price for less than 3
        });
    });

    describe('Multiple items of same type', () => {
        test('should calculate correct total for multiple Apples', () => {
            expect(calculateTotal(['Apple', 'Apple'])).toBe(70); // 35 * 2
            expect(calculateTotal(['Apple', 'Apple', 'Apple'])).toBe(105); // 35 * 3
        });

        test('should calculate correct total for multiple Bananas', () => {
            expect(calculateTotal(['Banana', 'Banana'])).toBe(40); // 20 * 2
            expect(calculateTotal(['Banana', 'Banana', 'Banana'])).toBe(60); // 20 * 3
        });

        test('should calculate correct total for multiple Melons (BOGO)', () => {
            expect(calculateTotal(['Melon', 'Melon'])).toBe(50); // (50/2) * 2 BOGO
            expect(calculateTotal(['Melon', 'Melon', 'Melon'])).toBe(100); // 2 for 50p+ 50p
        });

        test('should calculate correct total for multiple Limes (3-for-price-of-2)', () => {
            expect(calculateTotal(['Lime', 'Lime'])).toBe(30); // 2 × 15p = 30p (full price)
            expect(calculateTotal(['Lime', 'Lime', 'Lime'])).toBe(30); // 3 for price of 2 = 30p
            expect(calculateTotal(['Lime', 'Lime', 'Lime', 'Lime'])).toBe(45); // 3 for 30p + 1 for 15p
            expect(calculateTotal(['Lime', 'Lime', 'Lime', 'Lime', 'Lime'])).toBe(60); // 3 for 30p + 2 for 30p
            expect(calculateTotal(['Lime', 'Lime', 'Lime', 'Lime', 'Lime', 'Lime'])).toBe(60); // 6 for price of 4 = 60p
        });
    });

    describe('Mixed baskets', () => {
        test('should calculate correct total for mixed regular items', () => {
            expect(calculateTotal(['Apple', 'Banana'])).toBe(55); // 35 + 20
            expect(calculateTotal(['Apple', 'Banana', 'Apple'])).toBe(90); // 35 + 20 + 35
        });

        test('should calculate correct total for mixed items with special pricing', () => {
            expect(calculateTotal(['Apple', 'Melon'])).toBe(85); // 35 + 50
            expect(calculateTotal(['Banana', 'Lime'])).toBe(35); // 20 + 15
            expect(calculateTotal(['Melon', 'Lime'])).toBe(65); // 50 + 15
        });

        test('should calculate correct total for complex mixed basket', () => {
            expect(calculateTotal(['Apple', 'Banana', 'Melon', 'Lime']))
                .toBe(120); // 35 + 20 + 50 + 15
        });

        test('should calculate correct total for the example basket', () => {
            const basket = ["Melon", "Lime", "Lime", "Melon", "Lime"];
            expect(calculateTotal(basket)).toBe(80); // 50+30
        });
    });

    describe('Large quantities', () => {
        test('should handle large quantities of regular items', () => {
            const basket = Array(10).fill('Apple');
            expect(calculateTotal(basket)).toBe(350); // 35 * 10
        });

        test('should handle large quantities of BOGO items', () => {
            const basket = Array(10).fill('Melon');
            expect(calculateTotal(basket)).toBe(250); // (50/2) * 10
        });

        test('should handle large quantities of 3-for-price-of-2 items', () => {
            const basket = Array(10).fill('Lime');
            expect(calculateTotal(basket)).toBe(105); // 3 for 30p * 3 + 1 for 15p
        });
    });

    describe('Edge cases', () => {
        test('should handle unknown items gracefully', () => {
            expect(() => calculateTotal(['UnknownItem'])).toThrow("Unknown items found: UnknownItem"); // Error
        });

        test('should handle mixed known and unknown items', () => {
            expect(() => calculateTotal(['Apple', 'UnknownItem', 'Banana']))
                .toThrow("Unknown items found: UnknownItem"); // Error
        });

        test('should handle case sensitivity', () => {
            // Note: Current implementation is case-sensitive
            expect(() => calculateTotal(['apple'])).toThrow("Unknown items found: apple"); // lowercase 'apple' won't match
            expect(() => calculateTotal(['APPLE'])).toThrow("Unknown items found: APPLE"); // uppercase 'APPLE' won't match
        });
    });

    describe('Real-world scenarios', () => {
        test('should calculate family shopping basket', () => {
            const basket = [
                'Apple', 'Apple', 'Apple', 'Apple', // 4 apples
                'Banana', 'Banana',                 // 2 bananas
                'Melon', 'Melon', 'Melon',         // 3 melons (BOGO)
                'Lime', 'Lime', 'Lime', 'Lime', 'Lime' // 5 limes
            ];
            expect(calculateTotal(basket)).toBe(340); // 140 + 40 + 100 + 60
        });

        test('should calculate fruit salad ingredients', () => {
            const basket = ['Apple', 'Banana', 'Melon', 'Lime', 'Lime'];
            expect(calculateTotal(basket)).toBe(135); // 35 + 20 + 50 +  15 + 15
        });

        test('should calculate bulk lime purchase', () => {
            const basket = Array(15).fill('Lime');
            expect(calculateTotal(basket)).toBe(150); // 5*30p
        });
    });
});
