/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

window.IntersectionObserver = vi.fn().mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });
});
