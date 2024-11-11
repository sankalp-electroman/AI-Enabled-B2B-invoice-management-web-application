import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { toTitleCase } from "../../../utils";
import { DataContext, DISPATCHERS } from "../../../contexts/DataContext";
import axios from "axios";
import { SearchServletURL } from "../../../URL";

const AdvanceSearchDialogBox = (props) => {
	const { setRows, setEventDispatcher } = useContext(DataContext);
	const { open, handleClose } = props;

	const [data, setData] = useState({
		doc_id: "",
		invoice_id: "",
		cust_number: "",
		buisness_year: "",
	});

	const { doc_id, invoice_id, cust_number, buisness_year } = data;

	const handleChange = (e) => {
		let { name, value } = e.target;
		setData((prevData) => {
			return { ...prevData, [name]: value };
		});
	};

	const handleProceed = async () => {
		if (doc_id || invoice_id || cust_number || buisness_year) {
			const res = await axios
				.get(
					`${SearchServletURL}?doc_id=${doc_id}&cust_number=${cust_number}&buisness_year=${buisness_year}&invoice_id=${invoice_id}`,
				)
				.then((response) => response.data)
				.catch((err) => {
					console.log(err);
					return [];
				});
			const rows = res;
			const data = rows.map((row, idx) => {
				return { sl_no: idx + 1, ...row };
			});
			setEventDispatcher(DISPATCHERS["advance_search"]);
			setRows(data);
		} else {
			alert("WARNING : Empty fields are not allowed !");
		}
		setData({
			doc_id: "",
			invoice_id: "",
			cust_number: "",
			buisness_year: "",
		});
		handleClose();
	};

	const handleCancel = () => {
		setData({
			doc_id: "",
			invoice_id: "",
			cust_number: "",
			buisness_year: "",
		});
		setEventDispatcher(DISPATCHERS["default"]);
		handleClose();
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				style: {
					backgroundColor: "#2a3e4c",
				},
			}}>
			<DialogTitle id="alert-dialog-title" sx={{ color: "white" }}>
				{"Search Record ?"}
			</DialogTitle>
			<DialogContent>
				{Object.keys(data).map((searchField) => (
					<TextField
						id="standard-basic"
						label={toTitleCase(searchField)}
						variant="standard"
						size="large"
						sx={{ width: 220, margin: "1rem", background: "white" }}
						key={searchField}
						name={searchField}
						value={data[searchField]}
						onChange={handleChange}
					/>
				))}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleCancel}
					sx={{
						color: "white",
						border: "1px solid white",
						textTransform: "uppercase",
						letterSpacing: "3px",
					}}>
					CANCEL
				</Button>
				<Button
					onClick={handleProceed}
					sx={{
						color: "white",
						border: "1px solid white",
						textTransform: "uppercase",
						letterSpacing: "3px",
					}}>
					SEARCH
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AdvanceSearchDialogBox;
