import React, {useState, useEffect} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {TestCaseTable} from "src/components/TestCases";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./TestCases.scss";

const cx = cn.bind(styles);

export default function(props) {
	const url = `${consts.LCD_API_BASE}${consts.LCD_API.TEST_CASES}`;
	const [currentPage, setCurrentPage] = useState(1);
	const [currentTextSearch, setCurrentTextSearch] = useState("");
	const [state, , , , setUrl] = useFetch(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=1`);

	const pages = Math.ceil(parseInt(state?.data?.result?.count || 0) / consts.TABLE.PAGE_SIZE);

	const onPageChange = page => {
		setCurrentPage(page);
		setUrl(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=${page}&name=${currentTextSearch}`);
	};

	const handleSearch = textSearch => {
		setCurrentTextSearch(textSearch);
		setUrl(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=${currentPage}&name=${textSearch}`);
	};

	const dataForStatusBox = [
		{
			label: "Price",
			value: "$4.73",
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

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='TestCases' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

			<TestCaseTable testCases={state?.data?.result?.test_cases || []} pages={pages} onPageChange={onPageChange} handleSearch={handleSearch} />
		</Container>
	);
}