import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { DataSetServletURL } from "../../../URL";

const DeleteDialogBox = (props) => {
	const { open, handleClose } = props;
	const { ids, setIds } = useContext(DataContext);

	const handleProceed = async () => {
		const jsonBody = JSON.stringify({ ids: ids });
		await axios({
			method: "DELETE",
			url: `${DataSetServletURL}`,
			data: jsonBody,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				const obj = res.data;
				if (Object.values(obj).includes(false)) {
					const key = Object.keys(obj).find((key) => obj[key] === false);
					alert(`${key} failed to get deleted !`);
				} else {
					alert("Successfully deleted selected records !");
				}
			})
			.catch((err) => {
				alert("INTERNAL ERROR : Failed to delete the records !");
				console.err(err);
			});
		setIds([]);
		handleClose();
		window.location.reload();
	};

	const handleCancel = () => {
		setIds([]);
		handleClose();
		window.location.reload();
	};
	return (
		<div>
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
					{"Delete Records ?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						sx={{ color: "white" }}>
						Are sure you want to delete these record(s) ?
					</DialogContentText>
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
						DELETE
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DeleteDialogBox;
