import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toTitleCase } from "../../utils";
import { DataContext, DISPATCHERS } from "../../contexts/DataContext";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RestorePageSharpIcon from "@mui/icons-material/RestorePageSharp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { DataSetServletURL } from "../../URL";

const columns = [
	{ field: "sl_no", headerName: toTitleCase("sl_no"), width: 90 },
	{
		field: "aging_bucket",
		headerName: toTitleCase("aging_bucket"),
		width: 150,
	},
	{
		field: "business_code",
		headerName: toTitleCase("business_code"),
		width: 200,
	},
	{ field: "cust_number", headerName: toTitleCase("cust_number"), width: 200 },
	{
		field: "buisness_year",
		headerName: toTitleCase("buisness_year"),
		width: 200,
	},
	{ field: "doc_id", headerName: toTitleCase("doc_id"), width: 200 },
	{
		field: "posting_date",
		headerName: toTitleCase("posting_date"),
		width: 200,
	},
	{
		field: "document_create_date",
		headerName: toTitleCase("document_create_date"),
		width: 200,
	},
	{ field: "due_in_date", headerName: toTitleCase("due_in_date"), width: 200 },
	{
		field: "invoice_currency",
		headerName: toTitleCase("invoice_currency"),
		width: 200,
	},
	{
		field: "document_type",
		headerName: toTitleCase("document_type"),
		width: 200,
	},
	{
		field: "total_open_amount",
		headerName: toTitleCase("total_open_amount"),
		width: 200,
	},
	{ field: "clear_date", headerName: toTitleCase("clear_date"), width: 200 },
	{
		field: "baseline_create_date",
		headerName: toTitleCase("baseline_create_date"),
		width: 200,
	},
	{ field: "posting_id", headerName: toTitleCase("posting_id"), width: 200 },
	{
		field: "cust_payment_terms",
		headerName: toTitleCase("cust_payment_terms"),
		width: 200,
	},
	{ field: "invoice_id", headerName: toTitleCase("invoice_id"), width: 200 },
];

export default function DataGridUI() {
	const { rows, setRows, setIds, eventDispatcher, setEventDispatcher } =
		useContext(DataContext);
	const [rowCount, setRowCount] = useState(25);
	const [pageNumber, setPageNumber] = useState(1);

	// fetch data from DB
	useEffect(() => {
		const fetchData = async () => {
			const url = `${DataSetServletURL}?pageNumber=${pageNumber}&rowCount=${rowCount}`;
			const result = await axios
				.get(url)
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
					return [];
				});
			const data = result.map((itm, idx) => {
				let index = (pageNumber - 1) * rowCount + idx + 1;
				return { sl_no: index, ...itm };
			});

			setRows(data);
		};
		fetchData();
	}, [rowCount, pageNumber, setRows]);

	// custom pagination bar
	const CustomPaginationBar = () => {
		const handleRowCount = (e) => {
			setRowCount(e.target.value);
		};

		const handleFirstPage = () => {
			setPageNumber(1);
		};

		const handlePrev = () => {
			if (pageNumber > 1) {
				setPageNumber(pageNumber - 1);
			}
		};
		const handleNext = () => {
			setPageNumber(pageNumber + 1);
		};

		const handleDispatch = () => {
			setEventDispatcher(DISPATCHERS["default"]);
			window.location.reload();
		};

		if (
			eventDispatcher === DISPATCHERS["search"] ||
			eventDispatcher === DISPATCHERS["advance_search"] ||
			eventDispatcher === DISPATCHERS["predict"]
		) {
			return (
				<IconButton onClick={handleDispatch}>
					<RestorePageSharpIcon style={{ color: "white" }} />
				</IconButton>
			);
		}
		return (
			<div
				style={{ display: "flex", alignItems: "center", paddingRight: "1rem" }}>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
					<InputLabel id="rows-simple-select-label" style={{ color: "white" }}>
						Rows per page
					</InputLabel>
					<Select
						labelId="rows-select-label"
						id="rows-simple-select"
						value={rowCount}
						label="Rows"
						name="rowCount"
						onChange={handleRowCount}
						style={{ color: "white" }}>
						<MenuItem value={25}>25</MenuItem>
						<MenuItem value={50}>50</MenuItem>
						<MenuItem value={75}>75</MenuItem>
						<MenuItem value={100}>100</MenuItem>
					</Select>
				</FormControl>
				<div
					className="page__navigation"
					style={{ display: "flex", alignItems: "center" }}>
					<IconButton onClick={handleFirstPage}>
						<FirstPageIcon style={{ color: "white" }} fontSize="large" />
					</IconButton>
					<IconButton onClick={handlePrev}>
						<ArrowBackIosIcon style={{ color: "white" }} />
					</IconButton>
					{pageNumber}
					<IconButton onClick={handleNext}>
						<ArrowForwardIosIcon style={{ color: "white" }} />
					</IconButton>
				</div>
			</div>
		);
	};

	return (
		<div style={{ height: 450, width: "100%" }}>
			<DataGrid
				density="compact"
				checkboxSelection
				rowHeight={60}
				pageSize={
					eventDispatcher === DISPATCHERS["search"] ||
					eventDispatcher === DISPATCHERS["advance_search"]
						? 100
						: rowCount
				}
				pagination
				rows={rows}
				columns={columns}
				style={{ color: "white" }}
				getRowId={(row) => row.doc_id}
				components={{
					Pagination: CustomPaginationBar,
				}}
				onSelectionModelChange={(ids) => {
					setIds(ids);
				}}
			/>
		</div>
	);
}
