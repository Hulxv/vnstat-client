import { useState } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

import { IconButton, Tooltip, Flex } from "@chakra-ui/react";

import { BiLineChart, BiBarChart } from "react-icons/bi";

const Chart = ({ lineChartData, barChartData, title }) => {
	const [chart, setChart] = useState("bar");
	return (
		<>
			<Flex justify='space-around' w='100px' alignSelf='end' mr={8}>
				<Tooltip label='Bar Chart'>
					<IconButton
						colorScheme='green'
						icon={<BiBarChart size='1.4em' />}
						onClick={() => setChart("bar")}
					/>
				</Tooltip>
				<Tooltip label='Line Chart'>
					<IconButton
						colorScheme='green'
						icon={<BiLineChart size='1.4em' />}
						onClick={() => setChart("line")}
					/>
				</Tooltip>
			</Flex>
			{chart === "bar" ? (
				<BarChart data={barChartData} title={title} />
			) : chart === "line" ? (
				<LineChart data={lineChartData} title={title} />
			) : (
				<div>Choose Chart Style</div>
			)}
		</>
	);
};

export default Chart;
