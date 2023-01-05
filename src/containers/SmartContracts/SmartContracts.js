import React, { useState, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import { useGet } from "restful-react";
import consts from "src/constants/consts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import NoResult from "src/components/common/NoResult";
import SmartContractTable from "src/components/SmartContracts/SmartContractTable";
import SmartContractTableSkeleton from "src/components/SmartContracts/SmartContractTable/SmartContractTableSkeleton";
import SmartContractCardList from "src/components/SmartContracts/SmartContractCardList";
import SmartContractCardListSkeleton from "src/components/SmartContracts/SmartContractCardList/SmartContractCardListSkeleton";
import styles from "./SmartContracts.module.scss";
import WasmCodeTable from "src/components/WasmCode/WasmCodeTable";
import WasmCodeCardList from "src/components/WasmCode/WasmCodeCardList/WasmCodeCardList";
import SmartContractPopularTable from "src/components/SmartContracts/SmartContractPopularTable";
import { useDispatch } from "react-redux";
import { storeWasmCode, storePageCode } from "src/store/modules/wasmcode";
import SmartContractPopularTableSkeleton from "src/components/SmartContracts/SmartContractPopularTable/SmartContractPopularTableSkeleton";

const cx = cn.bind(styles);

const SmartContracts = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const [keyword, setKeyword] = useState(null);
	const [smartContractPageId, setSmartContractPageId] = useState(1);
	const smartContractTotalPagesRef = useRef(null);
	const [wasmCodePageId, setWasmCodePageId] = useState(1);
	const wasmCodeTotalPagesRef = useRef(null);
	const dispatch = useDispatch();

	const onSmartContractPageChange = page => {
		setSmartContractPageId(page);
	};

	const onWasmCodePageChange = page => {
		setWasmCodePageId(page);
		dispatch(
			storePageCode({
				page: page,
				limit: consts.REQUEST.LIMIT,
			})
		);
	};

	const basePath = `${consts.API.SMART_CONTRACTS}?limit=${consts.REQUEST.LIMIT}`;
	let path = `${basePath}&page_id=${smartContractPageId}`;

	const wasmCodePath = `${consts.API.WASM_CODE}?limit=${consts.REQUEST.LIMIT}&page_id=${wasmCodePageId}`;
	const popularSmartContract = `${consts.API.SMART_CONTRACTS}/popular`;

	// if (keyword) {
	// 	path = `${basePath}&page_id=${smartContractPageId}&tc_name=${keyword}`;
	// } else {
	// 	path = `${basePath}&page_id=${smartContractPageId}`;
	// }

	const { data, loading, error } = useGet({
		path: path,
	});

	const { data: wasmCodeData, error: wasmCodeError, loading: wasmCodeLoading } = useGet({
		path: wasmCodePath,
	});

	const { data: popularSmartContractsData, error: popularSmartContractError, loading: popularSmartContractLoading } = useGet({
		path: popularSmartContract,
	});

	let smartContractTitleSection;
	let filterSection;
	let tableSmartContractSection;
	let paginationSmartContractSection;
	let paginationWasmcodeSection;
	let tablePopularSmartContract;
	let tableWasmcode;

	let popularTitleSection = (
		<TitleWrapper>
			{isLargeScreen ? (
				<>
					<PageTitle title='Popular contracts' />
					<StatusBox />
				</>
			) : (
				<>
					<StatusBox />
					<PageTitle title='Popular contracts' />
				</>
			)}
		</TitleWrapper>
	);

	let wasmcodeTitleSection = (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title='Wasm Code' />
			</TitleWrapper>
		</Container>
	);

	if (isLargeScreen) {
		smartContractTitleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title='Smart contracts' />
				</TitleWrapper>
			</Container>
		);
	} else {
		smartContractTitleSection = <TogglePageBar type='smart-contracts' />;
	}

	if (popularSmartContractLoading) {
		tablePopularSmartContract = isLargeScreen ? <SmartContractPopularTableSkeleton /> : <SmartContractPopularTableSkeleton />;
	} else {
		if (popularSmartContractError) {
			tablePopularSmartContract = <NoResult />;
		} else {
			if (Array.isArray(popularSmartContractsData) && popularSmartContractsData.length > 0) {
				tablePopularSmartContract = isLargeScreen ? (
					<SmartContractPopularTable data={popularSmartContractsData} />
				) : (
					<SmartContractPopularTable data={popularSmartContractsData} />
				);
			} else {
				tablePopularSmartContract = <NoResult />;
			}
		}
	}

	if (wasmCodeLoading) {
		tableWasmcode = isLargeScreen ? <SmartContractTableSkeleton /> : <SmartContractCardListSkeleton />;
	} else {
		if (wasmCodeError) {
			wasmCodeTotalPagesRef.current = null;
			tableWasmcode = <NoResult />;
		} else {
			if (!isNaN(wasmCodeData?.page?.total_page)) {
				wasmCodeTotalPagesRef.current = wasmCodeData.page.total_page;
			} else {
				wasmCodeTotalPagesRef.current = null;
			}

			if (Array.isArray(wasmCodeData?.data) && wasmCodeData.data.length > 0) {
				tableWasmcode = isLargeScreen ? <WasmCodeTable data={wasmCodeData?.data} /> : <WasmCodeCardList data={wasmCodeData?.data} />;
			} else {
				tableWasmcode = <NoResult />;
			}
		}
	}

	if (loading) {
		tableSmartContractSection = isLargeScreen ? <SmartContractTableSkeleton /> : <SmartContractCardListSkeleton />;
	} else {
		if (error) {
			smartContractTotalPagesRef.current = null;
			tableSmartContractSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				smartContractTotalPagesRef.current = data.page.total_page;
			} else {
				smartContractTotalPagesRef.current = null;
			}
		}

		if (Array.isArray(data?.data) && data.data.length > 0) {
			tableSmartContractSection = isLargeScreen ? <SmartContractTable data={data?.data} /> : <SmartContractCardList data={data?.data} />;
		} else {
			tableSmartContractSection = <NoResult />;
		}
	}

	// filterSection = (
	// 	<div className={cx("filter-section")}>
	// 		<SearchInput
	// 			className={cx("search-input")}
	// 			placeholder='Search smart contracts'
	// 			value={keyword}
	// 			onChange={e => {
	// 				setKeyword(e.target.value);
	// 			}}
	// 		/>
	// 	</div>
	// );

	paginationSmartContractSection = smartContractTotalPagesRef.current ? (
		<Pagination pages={smartContractTotalPagesRef.current} page={smartContractPageId} onChange={(e, page) => onSmartContractPageChange(page)} />
	) : (
		<></>
	);

	paginationWasmcodeSection = wasmCodeTotalPagesRef.current ? (
		<Pagination pages={wasmCodeTotalPagesRef.current} page={wasmCodePageId} onChange={(e, page) => onWasmCodePageChange(page)} />
	) : (
		<></>
	);

	return (
		<>
			<Container fixed className={cx("smart-contracts")}>
				{popularTitleSection}
				{tablePopularSmartContract}
			</Container>

			<Container fixed className={cx("smart-contracts")}>
				{smartContractTitleSection}
				{filterSection}
				{tableSmartContractSection}
				{paginationSmartContractSection}
			</Container>

			<Container fixed className={cx("smart-contracts")}>
				{wasmcodeTitleSection}
				{tableWasmcode}
				{paginationWasmcodeSection}
			</Container>
		</>
	);
};

SmartContracts.propTypes = {};
SmartContracts.defaultProps = {};

export default SmartContracts;
