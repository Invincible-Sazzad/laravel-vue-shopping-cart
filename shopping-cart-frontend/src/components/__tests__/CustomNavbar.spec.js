import { describe, it } from "vitest";

/**
 * Need to mock pinia store. Also need to mock router.
 */

describe('CustomNavbar', () => {
    it('CustomNavbar renders properly', () => {
        // Logic...
    });

    it("CustomNavbar has 'E-Com' as title text", () => {
        // Logic...
    });


    describe("'Products' menu", () => {
        it("CustomNavbar has 'Products' menu", () => {
            // Logic...
        });

        it("'Products' menu navigates to the correct route", () => {
            // Logic...
        });
    });

    describe("Menu items when the user is unauthenticated", () => {
        describe("'Sign Up' menu", () => {
            it("CustomNavbar has 'Sign Up' menu", () => {
                // Logic...
            });
    
            it("'Sign Up' menu navigates to the correct route", () => {
                // Logic...
            });
        });

        describe("'Sign In' menu", () => {
            it("CustomNavbar has 'Sign In' menu", () => {
                // Logic...
            });
    
            it("'Sign In' menu navigates to the correct route", () => {
                // Logic...
            });
        });
    });

    describe("Menu items when the user is authenticated", () => {
        describe("'Sign Out' menu", () => {
            it("CustomNavbar has 'Sign Out' menu", () => {
                // Logic...
            });
    
            it("'Sign Out' menu navigates to the correct route", () => {
                // Logic...
            });
        });

        describe("'Cart Icon' menu", () => {
            it("CustomNavbar has 'Cart Icon' menu", () => {
                // Logic...
            });
    
            it("'Cart Icon' menu navigates to the correct route", () => {
                // Logic...
            });
        });
    });
});