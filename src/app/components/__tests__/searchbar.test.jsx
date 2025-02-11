import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar Component", () => {
	it("renders SearchBar component", async () => {
		render(<SearchBar onSearchChange={() => {}} />);

		const inputElement = screen.getByPlaceholderText("Search Advocates...");
		expect(inputElement).toBeInTheDocument();
	});

  it('calls onSearchChange prop when input value changes', async () => {
    const onSearchChange = jest.fn();
    render(<SearchBar onSearchChange={onSearchChange} />);
    const inputElement = screen.getByPlaceholderText('Search Advocates...');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(onSearchChange).toHaveBeenCalledTimes(1);
  });
});
