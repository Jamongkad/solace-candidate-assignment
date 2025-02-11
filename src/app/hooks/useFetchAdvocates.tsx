import { useState, useEffect } from "react";

export type Advocate = {
	firstName: string;
	lastName: string;
	city: string;
	degree: string;
	specialties: string[];
	yearsOfExperience: string;
	phoneNumber: string;
};

const useFetchAdvocates = (url: string, limit: number, offset: number) => {
	const [advocates, setAdvocates] = useState<Advocate[]>([]);
	const [resultCount, setResultCount] = useState<number | null>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAdvocates = async () => {
			try {
				const response = await fetch(`${url}?limit=${limit}&offset=${offset}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const { data, count } = await response.json();	
				setAdvocates(data);
				setResultCount(count);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError(String(error));
				}
			} finally {
				setLoading(false);
			}
		};

		fetchAdvocates();
	}, [url, limit, offset]);

	return { advocates, resultCount, loading, error };
};

export default useFetchAdvocates;
