"use client";

import { useState } from "react";
import SearchBar from "./components/searchbar";
import ItemList from "./components/itemlist";

export default function Home() {

	const [searchText, setSearchText] = useState<string>("");

	return (
		<div className="@container">
			<div className="flex flex-col mx-auto ">
				<div className="bg-teal-800">
					<div className="flex p-4">
						<p className="text-3xl dark:text-white">Solace Advocates</p>
					</div>
				</div>
				<div className="flex">
					<div className="flex flex-col w-full mt-2 mb-4">
						<SearchBar
							searchText={searchText}
							onSearchChange={(query: string) => {
								setSearchText(query);
							}}
						/>
					</div>
				</div>
				<ItemList searchText={searchText} />
			</div>
		</div>
	);
}
