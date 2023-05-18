import { describe, it } from "vitest";

/**
 * Need to mock pinia store
 */

describe('CartItem', () => {
    it('CartItem renders properly', () => {
        // Logic...
    });

    it('CartItem has cartId on props', () => {
        // Logic...
    });

    it('CartItem has cartItem object on props', () => {
        // Logic...
    });


    describe('Product quanity changes properly', () => {
        it("Clicking on '+' icon increments quantity", () => {
            // Logic...
        });
    
        it("Clicking on '-' icon decrements quantity", () => {
            // Logic...
        });
    });
});