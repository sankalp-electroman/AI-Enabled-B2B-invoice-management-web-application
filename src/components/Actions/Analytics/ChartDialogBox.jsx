import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { toTitleCase } from "../../../utils";

const ChartDialogBox = (props) => {
	const { open, handleClose } = props;

	const [analyticsData, setAnalyticsData] = useState({
		clear_date_open: "",
		clear_date_close: "",
		baseline_create_date_open: "",
		baseline_create_date_close: "",
		due_in_date_open: "",
		due_in_date_close: "",
		invoice_currency: "",
	});

	const handleChange = (e, type) => {
		let { name, value } = e.target;
		setAnalyticsData((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleProceed = () => {
		alert(analyticsData);
		handleClose();
	};

	const handleCancel = () => {
		setAnalyticsData({
			clear_date_open: "",
			clear_date_close: "",
			baseline_create_date_open: "",
			baseline_create_date_close: "",
			due_in_date_open: "",
			due_in_date_close: "",
			invoice_currency: "",
		});
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
				{"Analytics View"}
			</DialogTitle>
			<DialogContent>
				{Object.keys(analyticsData).map((field) => {
					if (
						field.includes("clear_date") ||
						field.includes("due_in_date") ||
						field.includes("baseline_create_date")
					) {
						return (
							<TextField
								id="standard-basic"
								label={toTitleCase(field)}
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
								key={field}
								name={field}
								value={analyticsData[field]}
								onChange={handleChange}
							/>
						);
					}
					return (
						<TextField
							id="outlined-basic"
							label={toTitleCase(field)}
							variant="standard"
							size="large"
							sx={{
								width: 220,
								margin: "1rem",
								background: "white",
							}}
							key={field}
							name={field}
							value={analyticsData[field]}
							onChange={(e) => handleChange(e)}
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
					VIEW
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ChartDialogBox;
