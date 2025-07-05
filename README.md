# Shopping Cart Calculator

A TypeScript-based shopping cart calculator that applies different pricing strategies to calculate the total cost of items in a basket.

## Prerequisites

- Node.js (version 12 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shahpranaf/shopping-cart.git
cd shopping-cart
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Running the Application

To run the main application:
```bash
npm start
```

This will execute the example in `src/index.ts` which calculates the total for a sample basket.

### Using the calculateTotal Function

```typescript
import { calculateTotal } from './src/index';

// Example basket
const basket = ["Apple", "Banana", "Melon", "Lime", "Lime", "Melon", "Lime"];

try {
    const total = calculateTotal(basket);
    console.log(`Total cost: Rs ${(total / 100).toFixed(2)}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
```

## Testing

### Running Tests

To run all tests:
```bash
npm test
```

## API Reference

### `calculateTotal(basket: string[]): number`

Calculates the total cost of items in a shopping basket.

**Parameters:**
- `basket`: Array of item names (strings)

**Returns:**
- `number`: Total cost in paise

**Throws:**
- `Error`: If basket contains unknown items
- `Error`: If basket is not a valid array

**Example:**
```typescript
const total = calculateTotal(["Apple", "Banana"]);
// Returns: 55 (35 + 20 paise)
```


## License

This project is licensed under the ISC License.

## Author

Pranav Shah
