import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./Requests.scss";
import {RequestsListTable} from "src/components/Requests";

const cx = cn.bind(styles);

export default function(props) {
	const {detailId} = useParams();
	const url = `${consts.LCD_API_BASE}${consts.LCD_API.DATA_SOURCE_DETAIL}/${detailId}`;
	const [state, , , , setUrl] = useFetch(`${url}`);
	const pages = parseInt(state?.data?.result?.count || 0);
	const onPageChange = page => {
		setUrl(`${url}`);
	};
	const dataForStatusBox = [
		{
			label: "Price",
			value: "$455.73",
		},
		{
			label: "Height",
			value: "4,374,598",
		},
		{
			label: "Bonded",
			value: "189,132,631",
		},
		{
			label: "Inflation",
			value: "7.00%",
		},
	];

	const switchList = ["All", "Core", "Community", "Active", "Pending", "Closed"];
	const [activeSwitchItem, setActiveSwitchItem] = useState("All");
	const onActiveSwitchItem = item => {
		setActiveSwitchItem(item);
	};

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='Coming Soon' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

			{/* <div className={cx("request-board-list")}>
				<div className={cx("request-board-list__title")}>304,888 In total</div>
				<RequestsListTable />
			</div> */}
		</Container>
	);
}