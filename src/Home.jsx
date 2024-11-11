import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ActionBar from "./components/Actions/ActionBar";
import DataGridUI from "./components/DataGrid/DataGrid";
import "./Home.css";
import { DataProvider } from "./contexts/DataContext";

const Home = () => {
	return (
		<section className="Home">
			<Header />
			<DataProvider>
				<ActionBar />
				<section id="grid-container">
					<DataGridUI />
				</section>
			</DataProvider>
			<Footer />
		</section>
	);
};

export default Home;
