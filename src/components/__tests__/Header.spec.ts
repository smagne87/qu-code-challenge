import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import HeaderComponent from '../Header/HeaderComponent.vue';

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HeaderComponent);
    expect(wrapper.text()).toContain('Code Challenge Magne Sebastian');
  });
});
