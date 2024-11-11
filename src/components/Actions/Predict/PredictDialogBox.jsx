import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { GetPredictDataURL, UpdateAgingBucketURL } from "../../../URL";

const PredictTable = ({ rows }) => {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 400, backgroundColor: "#162531", color: "#fff" }}
				aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center" style={{ color: "#fff" }}>
							Document ID
						</TableCell>
						<TableCell align="center" style={{ color: "#fff" }}>
							Aging Bucket (days)
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.doc_id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell
								component="th"
								scope="row"
								align="center"
								style={{ color: "#fff" }}>
								{parseInt(row.doc_id)}
							</TableCell>
							<TableCell align="center" style={{ color: "#fff" }}>
								{row.aging_bucket}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const PredictDialogBox = (props) => {
	const { open, handleClose } = props;
	const { ids, setIds } = useContext(DataContext);
	const [predictData, setPredictData] = useState([]);

	useEffect(() => {
		const fetchPredictionData = async () => {
			const jsonBody = JSON.stringify({ data: ids });
			const res = await axios({
				method: "POST",
				url: `${GetPredictDataURL}`,
				data: jsonBody,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setPredictData(res.data);
		};
		fetchPredictionData();
	}, [ids]);

	const handleProceed = async () => {
		const jsonBody = JSON.stringify({ data: predictData });
		await axios({
			method: "PUT",
			url: `${UpdateAgingBucketURL}`,
			data: jsonBody,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				const obj = res.data;
				if (Object.values(obj).includes(false)) {
					const key = Object.keys(obj).find((key) => obj[key] === false);
					alert(`${key} failed to get updated !`);
				} else {
					alert("Successfully updated selected records !");
				}
			})
			.catch((err) => {
				alert("INTERNAL ERROR : Failed to update the records !");
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
					{"Predict Aging Bucket"}
				</DialogTitle>
				<DialogContent>
					<PredictTable rows={predictData} />
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
						CLOSE
					</Button>
					<Button
						onClick={handleProceed}
						sx={{
							color: "white",
							border: "1px solid white",
							textTransform: "uppercase",
							letterSpacing: "3px",
						}}>
						PROCEED
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default PredictDialogBox;
