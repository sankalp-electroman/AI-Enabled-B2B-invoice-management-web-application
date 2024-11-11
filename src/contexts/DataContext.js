import React, { useState, createContext } from "react";

const DataContext = createContext();

export const DISPATCHERS = {
	search: "SEARCH",
	advance_search: "ADVANCE_SEARCH",
	predict: "PREDICT",
	default: "DEFAULT",
};

const DataProvider = (props) => {
	const { children } = props;
	const [rows, setRows] = useState([]);
	const [ids, setIds] = useState([]);
	const [eventDispatcher, setEventDispatcher] = useState(
		DISPATCHERS["default"],
	);

	return (
		<DataContext.Provider
			value={{
				rows,
				setRows,
				ids,
				setIds,
				eventDispatcher,
				setEventDispatcher,
			}}>
			{children}
		</DataContext.Provider>
	);
};

export { DataContext, DataProvider };
