import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { toTitleCase } from "../../../utils";
import axios from "axios";
import { DataSetServletURL } from "../../../URL";

const AddDialogBox = (props) => {
	const { open, handleClose } = props;

	const [data, setData] = useState({
		business_code: "",
		cust_number: "",
		doc_id: "",
		invoice_currency: "",
		document_type: "",
		cust_payment_terms: "",
		invoice_id: "",
		posting_id: "",
		buisness_year: "",
		total_open_amount: "",
		clear_date: "",
		posting_date: "",
		document_create_date: "",
		due_in_date: "",
		baseline_create_date: "",
	});

	const handleChange = (e) => {
		let { name, value } = e.target;
		setData((prevData) => {
			return { ...prevData, [name]: value };
		});
	};

	const handleProceed = async () => {
		const jsonBody = JSON.stringify(data);
		await axios({
			method: "POST",
			url: `${DataSetServletURL}`,
			data: jsonBody,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => console.log(res.data))
			.catch((err) => {
				alert("Failed to add data !");
				console.log(err);
			});
		handleClose();
		window.location.reload();
	};

	const handleCancel = () => {
		setData({
			posting_id: "",
			business_code: "",
			doc_id: "",
			invoice_currency: "",
			document_type: "",
			cust_payment_terms: "",
			cust_number: "",
			invoice_id: "",
			clear_date: "",
			posting_date: "",
			buisness_year: "",
			document_create_date: "",
			due_in_date: "",
			baseline_create_date: "",
			total_open_amount: "",
		});
		handleClose();
		window.location.reload();
	};

	return (
		<Dialog
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth="lg"
			PaperProps={{
				style: {
					backgroundColor: "#2a3e4c",
				},
			}}
			open={open}
			onClose={handleClose}>
			<DialogTitle id="alert-dialog-title" sx={{ color: "white" }}>
				{"Add New Record"}
			</DialogTitle>
			<DialogContent>
				{Object.keys(data).map((addField) => {
					if (
						addField === "clear_date" ||
						addField === "posting_date" ||
						addField === "document_create_date" ||
						addField === "due_in_date" ||
						addField === "baseline_create_date"
					) {
						return (
							<TextField
								id="standard-basic"
								label={toTitleCase(addField)}
								variant="standard"
								size="large"
								type="date"
								sx={{
									width: 220,
									margin: "1rem",
									background: "white",
								}}
								InputLabelProps={{
									shrink: true,
								}}
								key={addField}
								name={addField}
								value={data[addField]}
								onChange={handleChange}
							/>
						);
					}
					return (
						<TextField
							id="outlined-basic"
							label={toTitleCase(addField)}
							variant="standard"
							size="large"
							sx={{
								width: 220,
								margin: "1rem",
								background: "white",
							}}
							key={addField}
							name={addField}
							value={data[addField]}
							onChange={handleChange}
						/>
					);
				})}
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
					ADD
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddDialogBox;
