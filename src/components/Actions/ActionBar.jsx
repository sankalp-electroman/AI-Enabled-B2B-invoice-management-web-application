import React, { useContext } from "react";
import SimpleSearch from "./Search/SimpleSearchBox.jsx";
import ActionButton from "./ActionButton/ActionButton";
import DeleteDialogBox from "./CRUD/DeleteDialogBox";
import EditDialogBox from "./CRUD/EditDialogBox";
import AddDialogBox from "./CRUD/AddDialogBox";
import AdvanceSearchDialogBox from "./Search/AdvanceSearchDialogBox";
import { DataContext } from "../../contexts/DataContext";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
// import ChartBoard from "./Analytics/ChartBoard";
import PredictDialogBox from "./Predict/PredictDialogBox.jsx";
import ChartDialogBox from "./Analytics/ChartDialogBox.jsx";
import "./ActionBar.css";

const ActionBar = () => {
	const { ids } = useContext(DataContext);

	const handleRefresh = () => {
		window.location.reload();
	};

	return (
		<div className="action-bar">
			<div className="btn_group data_group">
				<ActionButton name="PREDICT" disabled={ids.length > 0 ? false : true}>
					<PredictDialogBox />
				</ActionButton>
				<ActionButton name="ANALYTICS VIEW">
					<ChartDialogBox />
					{/* <ChartBoard /> */}
				</ActionButton>
				<ActionButton name="ADVANCE SEARCH">
					<AdvanceSearchDialogBox />
				</ActionButton>
				<IconButton onClick={handleRefresh}>
					<RefreshIcon id="refresh_icon" />
				</IconButton>
			</div>
			<SimpleSearch />
			<div className="btn_group crud_group">
				<ActionButton name="ADD">
					<AddDialogBox />
				</ActionButton>
				<ActionButton name="EDIT" disabled={ids.length === 1 ? false : true}>
					<EditDialogBox />
				</ActionButton>
				<ActionButton name="DELETE" disabled={ids.length > 0 ? false : true}>
					<DeleteDialogBox />
				</ActionButton>
			</div>
		</div>
	);
};

export default ActionBar;
