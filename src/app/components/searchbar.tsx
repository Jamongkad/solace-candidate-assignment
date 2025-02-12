import React, { useState } from "react";
// SearchBar.tsx
interface SearchBarProps {
	searchText: string | undefined;
	onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchText,
	onSearchChange,
}: SearchBarProps) => {

	return (
		<div className="hero bg-gredient-dark h-400px flex flex-col px-2">
			<div className="search-box mx-auto my-auto w-full sm:w-full md:w-full lg:w-3/4 xl:w-3/4">
				<div className="flex flex-row">
					<span
						className="flex items-center bg-gray-100 rounded rounded-r-none border-0 px-3 font-bold text-grey-100">👥</span>
					<input
						className="h-16 bg-gray-100 text-grey-darker py-2 font-normal text-grey-darkest border border-gray-100 font-bold w-full py-1 px-2 outline-none text-lg text-gray-600"
						type="text" placeholder="Search Advocates..."
						value={searchText}
						onChange={(e) => {
							onSearchChange(e.target.value)
						}} />
					{searchText && (
						<span
							className="flex items-center bg-gray-100 rounded rounded-l-none border-0 px-3 font-bold text-grey-100">
							<button
								type="button"
								className="bg-gredient-dark hover:bg-gredient-light text-xs text-black font-bold py-3 px-6 rounded" onClick={() => onSearchChange("")}> Clear Search</button>
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
