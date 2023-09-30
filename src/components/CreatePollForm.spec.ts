import { render, screen, fireEvent } from '@testing-library/svelte';
import CreatePollForm from './CreatePollForm.svelte';

describe('CreatePollForm', () => {
  test('renders the form with input fields and buttons', () => {
    const { getByLabelText, getByText } = render(CreatePollForm);

    // Ensure the form elements are present
    const questionInput = getByLabelText('Poll Question:');
    const answerAInput = getByLabelText('Answer A:');
    const answerBInput = getByLabelText('Answer B:');
    const addButton = getByText('Add Poll');
    const addRandomButton = getByText('Add random');

    expect(questionInput).toBeInTheDocument();
    expect(answerAInput).toBeInTheDocument();
    expect(answerBInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addRandomButton).toBeInTheDocument();
  });

  test('displays error message for question length', async () => {
    const { getByLabelText, getByText } = render(CreatePollForm);

    const questionInput = getByLabelText('Poll Question:');
    const addButton = getByText('Add Poll');

    // Submit the form with a question that is too short
    fireEvent.input(questionInput, { target: { value: 'abc' } });
    fireEvent.click(addButton);

    // Ensure error message is displayed for question length
    const errorMessage = await screen.findByText(/Add question that has at least 5 characters/i, {}, { timeout: 3000 });

    expect(errorMessage).toBeInTheDocument();
  });
});
