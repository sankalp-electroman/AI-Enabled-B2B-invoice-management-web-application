import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { DataContext, DISPATCHERS } from "../../../contexts/DataContext";
import axois from "axios";
import "./search.css";
import { DataServletURL } from "../../../URL";

function SimpleSearch() {
	const [search, setSearch] = useState("");
	const { setRows, setEventDispatcher } = useContext(DataContext);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSearchClick = async () => {
		if (search) {
			const result = await axois
				.get(`${DataServletURL}?cust_number=${search}`)
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
					return [];
				});
			const data = result.map((row, idx) => {
				return { sl_no: idx + 1, ...row };
			});
			setEventDispatcher(DISPATCHERS["search"]);
			setRows(data);
			setSearch("");
		} else {
			alert("Warning ! Search Input cannot be empty.");
		}
	};

	return (
		<div id="search__box">
			<TextField
				id="standard-basic"
				label="Search Customer ID"
				variant="filled"
				size="small"
				sx={{ width: 220, background: "white" }}
				name="simple-search-box"
				value={search}
				onChange={handleChange}
			/>
			<IconButton onClick={handleSearchClick}>
				<SearchIcon className="search__btn" />
			</IconButton>
		</div>
	);
}

export default SimpleSearch;
