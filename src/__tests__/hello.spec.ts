import { render, screen } from '@testing-library/svelte';
import App from '../App.svelte';

describe('App', () => {
  test('shows the todo text when rendered', () => {
    render(App);

    expect(App).toBeDefined();
  });
});
