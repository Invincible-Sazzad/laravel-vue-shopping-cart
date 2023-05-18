import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ProductSearch from "@/components/ProductSearch.vue";

describe('ProductSearch', () => {
    const wrapper = mount(ProductSearch);

    it('Product search renders properly', () => {
        expect(wrapper.find('#product_search').exists()).toBe(true);
    });

    describe('Search by keyword', () =>  {
        it('Emit an event with the right input value on form submit', async () => {
            const input = wrapper.find('input');
            const searchKeyword = 'temp';

            await input.setValue(searchKeyword);

            expect(input.element.value).toBe(searchKeyword);

            await wrapper.find('form').trigger('submit.prevent');
            
            expect(wrapper.emitted()).toHaveProperty('handleSearch');

            expect(wrapper.emitted('handleSearch')[0][0]).toBe(searchKeyword);
        });
    });
});