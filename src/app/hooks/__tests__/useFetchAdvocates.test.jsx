import { renderHook, waitFor } from "@testing-library/react";
import useFetchAdvocates from "../useFetchAdvocates";

const mockAdvocates = {
	data: [
		{ id: 1, name: "Toyota Supra" },
		{ id: 2, name: "Ford Mustang" },
		{ id: 3, name: "Mazda Miata" },
	]
}

// Mock fetch function
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve(mockAdvocates),
	})
);

const testUrl = "/test/api/pikachu";

describe("useFetchAdvocates", () => {
	afterEach(() => {
		jest.clearAllMocks(); 
	});

	it("fetches advocates", async () => {
		const { result } = renderHook(() => useFetchAdvocates(testUrl, 4, 0));

		await waitFor(() => {
			expect({ data: result.current.advocates }).toEqual(mockAdvocates);
		});
	});

	it("handles fetch errors correctly", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			})
		);

		const { result } = renderHook(() => useFetchAdvocates(testUrl, 4, 0));

		await waitFor(() => {
			expect(result.current.error).toBe("Network response was not ok");
		});

		expect(result.current.loading).toBe(false);
	});

	it("handles API 500 error correctly", async () => {
		global.fetch = jest.fn(
			() => Promise.reject(new Error("Internal Server Error")) // Simulating a 500 error
		);

		const { result } = renderHook(() => useFetchAdvocates(testUrl, 4, 0));

		await waitFor(() => {
			expect(result.current.error).toBe("Internal Server Error");
		});

		expect(result.current.loading).toBe(false);
		expect(fetch).toHaveBeenCalledTimes(1);
	});
});
