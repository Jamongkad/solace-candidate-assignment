import React, { useEffect, useState } from "react";
import useFetchAdvocates, { Advocate } from "../hooks/useFetchAdvocates";

interface ItemListProps {
	searchText: string | null;
}

const ItemList: React.FC<ItemListProps> = ({ searchText }: ItemListProps) => {

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize,] = useState(10);
	const offset = (currentPage - 1) * pageSize;

	const { advocates, resultCount, loading } = useFetchAdvocates("/api/advocates", pageSize, offset);
	const totalPages = Math.ceil((resultCount ?? 0) / pageSize);

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const filteredItems = advocates && advocates.filter(
		(advocate: Advocate) => {
			return (
				advocate.firstName.toLowerCase().includes((searchText ?? "").toLocaleLowerCase()) ||
				advocate.lastName.toLocaleLowerCase().includes((searchText ?? "").toLocaleLowerCase()) ||
				advocate.city.toLocaleLowerCase().includes((searchText ?? "").toLocaleLowerCase()) ||
				advocate.degree.toLocaleLowerCase().includes((searchText ?? "").toLocaleLowerCase()) ||
				advocate.specialties.filter(str => new RegExp(searchText!, "i").test(str)).length > 0 ||
				advocate.phoneNumber.toString() === searchText ||
				advocate.yearsOfExperience.toString() === searchText
			)
		}
	) || [];

	return (
		<React.Fragment>
			<div className="grid grid-cols-7 border border-gray-300 ml-2 mr-2">
				<div className="font-bold bg-gray-200 p-2 flex justify-center items-center">First Name</div>
				<div className="font-bold bg-gray-200 p-2 flex justify-center items-center">Last Name</div>
				<div className="font-bold bg-gray-200 p-2 flex justify-center items-center">City</div>
				<div className="font-bold bg-gray-200 p-2 flex justify-center items-center">Degree</div>
				<div className="font-bold bg-gray-200 p-2 flex justify-center items-center">Specialities</div>
				<div className="font-bold bg-gray-200 p-2 flex justify-center items-center">Years of Experience</div>
				<div className="font-bold bg-gray-200 p-2 flex justify-center items-center">Phone Number</div>
				<React.Fragment>
					{!loading ?
						(filteredItems.map((advocate: Advocate, index: number) => {
							return (
								<React.Fragment key={index}>
									<div className={`p-1 flex justify-center items-center ${colorSwitch(index)}`}>{advocate.firstName}</div>
									<div className={`p-1 flex justify-center items-center ${colorSwitch(index)}`}>{advocate.lastName}</div>
									<div className={`p-1 flex justify-center items-center ${colorSwitch(index)}`}>{advocate.city}</div>
									<div className={`p-1 flex justify-center items-center ${colorSwitch(index)}`}>{advocate.degree}</div>
									<div className={`p-1 break-words whitespace-normal ${colorSwitch(index)}`}>
										{advocate.specialties.map((s) => (
											<p className={`p-1 text-sm`} key={s}>{s}</p>
										))}
									</div>
									<div className={`p-1 flex justify-center items-center ${colorSwitch(index)}`}>{advocate.yearsOfExperience}</div>
									<div className={`p-1 flex justify-center items-center ${colorSwitch(index)}`}>{advocate.phoneNumber}</div>
								</React.Fragment>
							)
						}))
						: (
							<div className="p-2 col-span-7 flex justify-center items-center">
								<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
							</div>
						)
					}
				</React.Fragment>
			</div>
			<div className="flex items-center pt-6 pb-6 justify-center">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
				>
					Previous
				</button>

				<span className="text-gray-700 px-4 py-2">
					Page {currentPage} of {totalPages}
				</span>

				<button
					onClick={nextPage}
					disabled={currentPage === totalPages}
					className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</React.Fragment>
	);
};

const colorSwitch = (index: number) => {
	return index % 2 === 0 ? "bg-blue-50" : "bg-white";
}

export default ItemList;
