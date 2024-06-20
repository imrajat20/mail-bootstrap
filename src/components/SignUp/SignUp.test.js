import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";



describe('checking signup component', () => {
  

  test('renders the SignUp component correctly', () => {
    render(<SignUp />);
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('submits the form and calls fetch', async () => {

    global.fetch = jest.fn(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ idToken: 'fake-id-token' }),
        });
      });
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
