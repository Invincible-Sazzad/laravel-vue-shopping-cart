import { describe, it } from 'vitest'

// import { mount } from '@vue/test-utils'
// import SingleProduct from '@/components/SingleProduct.vue'

/**
 * Need to mock the router
 */

describe('SingleProduct', () => {
  it('component renders properly', () => {
    // const product = {
    //     "id": 17,
    //     "title": "neque",
    //     "description": "Cumque magnam explicabo officia.",
    //     "image_url": "http://127.0.0.1:8000/images/apple-watch.png",
    //     "price": 125,
    //     "created_at": "2023-04-07T07:25:32.000000Z",
    //     "updated_at": "2023-04-07T07:25:32.000000Z"
    // };
    
    // const wrapper = mount(SingleProduct, { 
    //     props: { 
    //         product: {}
    //     } 
    // });

    // expect(wrapper.find('.product-card').exists()).toBe(true);
  });

  it('check if product details route exists', () => {

  });

  describe('Single product details on props', () => {
    it('props contains product id', () => {

    });

    it('props contains product title', () => {

    });

    it('props contains product image', () => {

    });

    it('props contains product price', () => {

    });
  });
});
