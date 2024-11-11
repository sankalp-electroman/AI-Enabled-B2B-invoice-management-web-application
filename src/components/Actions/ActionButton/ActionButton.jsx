import React, { useState, cloneElement, Children } from "react";
import Button from "@mui/material/Button";
import "./ActionButton.css";

const ActionButton = (props) => {
	const { name, disabled, children } = props;

	// handle modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			{disabled ? (
				<Button
					variant="outlined"
					size="large"
					className={`${name}_btn btn_disabled`}
					disabled
					style={{
						color: "white",
						border: "1px solid #3A3845",
						cursor: "not-allowed",
					}}>
					{name}
				</Button>
			) : (
				<Button
					variant="outlined"
					size="large"
					className={`${name}_btn btn`}
					style={{ color: "white" }}
					onClick={handleOpen}>
					{name}
				</Button>
			)}
			{Children.map(children, () => {
				return <>{cloneElement(children, { open, handleClose })}</>;
			})}
		</>
	);
};

export default ActionButton;
