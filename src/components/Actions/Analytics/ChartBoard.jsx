import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { AnalyticsURL } from "../../../URL";

const ChartBoard = (props) => {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const { open, handleClose } = props;
	const [chartId, setChartId] = useState("default");
	const [chartData, setChartData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const url = `${AnalyticsURL}`;
				const response = await axios.get(url);
				setChartData({ ...response.data });
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [chartId]);

	const handleWindowClose = () => {
		handleClose();
		setChartId("");
		window.location.reload();
	};

	const handleChart = (id, e) => {
		setChartId(id);
	};

	return (
		<Dialog
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth="lg"
			PaperProps={{
				style: {
					backgroundColor: "#fff",
				},
			}}
			open={open}
			onClose={handleClose}>
			<DialogTitle
				id="alert-dialog-title"
				sx={{ color: "darkslategray", textAlign: "center" }}>
				{"ANALYTICS VIEW"}
			</DialogTitle>
			<DialogContent>
				<div
					id="dialog-actions-bar"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						flexWrap: "wrap",
					}}>
					<Button
						variant="contained"
						size="large"
						style={{ margin: "1rem" }}
						name="invoice-currency"
						onClick={(e) => handleChart("invoice-currency", e)}>
						INVOICE CURRENCY CHART
					</Button>
				</div>
				<div id="chart-show-box">
					<Pie
						data={{
							labels: Object.keys(chartData),
							datasets: [
								{
									label: "# no of currencies",
									data: Object.values(chartData),
									backgroundColor: ["orange", "blue"],
									borderWidth: 1,
								},
							],
						}}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleWindowClose}>CLOSE</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ChartBoard;
