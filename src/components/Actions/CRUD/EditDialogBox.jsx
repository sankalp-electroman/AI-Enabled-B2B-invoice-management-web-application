import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { toTitleCase } from "../../../utils";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { DataServletURL } from "../../../URL";

const EditDialogBox = (props) => {
	const { ids, setIds } = useContext(DataContext);

	const { open, handleClose } = props;

	const [data, setData] = useState({
		invoice_currency: "",
		cust_payment_terms: "",
	});
	const { invoice_currency, cust_payment_terms } = data;

	const handleChange = (e) => {
		let { name, value } = e.target;
		setData((prevData) => {
			return { ...prevData, [name]: value };
		});
	};

	const handleProceed = async () => {
		if (invoice_currency && cust_payment_terms) {
			const jsonBody = JSON.stringify(data);
			const doc_id = ids[0];

			await axios({
				method: "PUT",
				url: `${DataServletURL}?doc_id=${doc_id}`,
				data: jsonBody,
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (res.data == "1") {
						alert("Edited Record Successfully !");
					} else {
						alert("Failed to Update the record");
					}
				})
				.catch((err) => {
					console.log(err);
					alert("INTERNAL ERROR : Failed to Update the record !");
				});
		}
		setIds([]);
		handleClose();
		window.location.reload();
	};

	const handleCancel = () => {
		setData({ invoice_currency: "", cust_payment_terms: "" });
		setIds([]);
		handleClose();
		window.location.reload();
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
				{"Edit Record ?"}
			</DialogTitle>
			<DialogContent>
				{Object.keys(data).map((editField) => (
					<TextField
						id="standard-basic"
						label={toTitleCase(editField)}
						variant="standard"
						size="large"
						sx={{ width: 220, margin: "1rem", background: "white" }}
						key={editField}
						name={editField}
						value={data[editField]}
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
					EDIT
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditDialogBox;
