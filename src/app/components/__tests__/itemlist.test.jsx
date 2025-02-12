import { fireEvent, render, screen } from "@testing-library/react";
import ItemList from "../ItemList";
import useFetchAdvocates from "../../hooks/useFetchAdvocates";

jest.mock("../../hooks/useFetchAdvocates");

const mockAdvocates = [
  { firstName: "Apple", lastName: "Banana", city: "", degree: "", specialties: [], phoneNumber: "", yearsOfExperience: 0 },
  { firstName: "Cherry", lastName: "Date", city: "", degree: "", specialties: [], phoneNumber: "", yearsOfExperience: 0 },
];

describe("ItemList Component", () => {
  it('renders ItemList component', async () => {
    (useFetchAdvocates).mockReturnValue({
      advocates: mockAdvocates,
      loading: false,
      error: null,
    });
    render(<ItemList searchText={null} />);
    expect(await screen.queryByText('Apple')).toBeVisible()
    expect(await screen.queryByText('Cherry')).toBeVisible()
  });

  it('filters based on search text', async () => {
    (useFetchAdvocates).mockReturnValue({
      advocates: mockAdvocates,
      loading: false,
      error: null,
    });
    render(<ItemList searchText={'Date'} />);
    expect(await screen.queryByText('Cherry')).toBeVisible()
    expect(await screen.queryByText('Apple')).toBeNull();
  });
});