import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ProductSearch from "@/components/ProductSearch.vue";

describe('ProductSearch', () => {
    it('Product search renders properly', () => {
        const wrapper = mount(ProductSearch);

        expect(wrapper.find('#product_search').exists()).toBe(true);
    });
});