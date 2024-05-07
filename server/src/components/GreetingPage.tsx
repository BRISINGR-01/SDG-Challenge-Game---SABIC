import { useEffect, useState } from "react";

const data = [
	<span style={{ fontSize: 30 }}>
		<span style={{ fontWeight: 700, fontSize: 40 }}>Dial it down</span>
		<br />
		Moving your thermostat down just two degrees in winter and up two degrees in summer could save about 2,000 pounds of
		carbon dioxide per year.
	</span>,
	<span style={{ fontSize: 30 }}>
		<span style={{ fontWeight: 700, fontSize: 40 }}>Turn it off</span>
		<br />
		Artificial lighting accounts for 44 percent of electricity use in office buildings. Make it a habit to turn off the
		lights when you're leaving any room for 15 minutes or more. Same goes for electronics; switch off power strips and
		unplug electrical devices when you're not using them.
	</span>,
	<span style={{ fontSize: 30 }}>
		<span style={{ fontWeight: 700, fontSize: 40 }}>Use cold water</span>
		<br />
		Using cold water can save up to 80 percent of the energy required to wash clothes. Choosing a low setting on the
		washing machine will also help save water.
	</span>,
	<span style={{ fontSize: 30 }}>
		<span style={{ fontWeight: 700, fontSize: 40 }}>Switch to e-billing</span>
		<br />
		In the United States, paper products make up the largest percentage of municipal solid waste, and hard copy bills
		alone generate almost 2 million tons of CO2. Save paper by signing up for e-billing.
	</span>,
	<span style={{ fontSize: 30 }}>
		<span style={{ fontWeight: 700, fontSize: 40 }}>Buy local</span>
		<br />
		In North America, fruits and vegetables travel an average of 1,500 miles before reaching your plate. Buy fresh,
		local food to eliminate the long distances traveled and preserve nutrients and flavor.
	</span>,
	<span style={{ fontSize: 30 }}>
		<span style={{ fontWeight: 700, fontSize: 40 }}>Recycle</span>
		<br />
		You can recycle plastic bottles, paper, electronics and batteries, among other items. Learn how to properly dispose
		of or recycle these products and reduce consumer waste.
	</span>,
	<span style={{ fontSize: 30 }}>
		<span style={{ fontWeight: 700, fontSize: 40 }}>Go solar</span>
		<br />
		Powering your home with solar panels can reduce your electric bills, shrink your carbon footprint and increase your
		home's value. <a href="https://www.worldwildlife.org/pages/solar-panels">Let us show you how easy it is.</a>
	</span>,
];

export default function GreetingPage() {
	const [displayDataIndex, setDisplayDataIndex] = useState(0);
	const [fade, setFade] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(0);
			setTimeout(() => {
				setFade(1);
				setDisplayDataIndex((i) => (i >= data.length - 1 ? 0 : i + 1));
			}, 1000);
		}, 10_000);

		return () => clearInterval(interval);
	});

	return (
		<div style={{ padding: "4em", height: "80vh", width: "80vw" }}>
			<span style={{ fontSize: 40, color: "#939598" }}>Sustainability & Innovation</span>
			<br />
			<br />
			<div style={{ opacity: fade, transition: "1s" }}>{data[displayDataIndex]}</div>
		</div>
	);
}
