/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import _ from "lodash";
import consts from "src/constants/consts";
import {decodeTx} from "src/helpers/helper";
import PageTitle from "src/components/common/PageTitle";
import NotFound from "src/components/common/NotFound";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import TxInfo from "src/components/Tx/TxInfo";
import TxInfoSkeleton from "src/components/Tx/TxInfo/TxInfoSkeleton";
import TxData from "src/components/Tx/TxData";
import TxDataSkeleton from "src/components/Tx/TxData/TxDataSkeleton";
import styles from "./Tx.module.scss";

const cx = cn.bind(styles);

const SuccessTx = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const countRefetchRef = useRef(0);
	const intervalRef = useRef(null);
	const [shouldRefetch, setShouldRefetch] = useState(true);
	const params = useParams();
	const txHash = params?.["tx"];
	const path = `${consts.API.TX}/${txHash}`;

	const {data, loading, error, refetch} = useGet({
		path,
	});

	let titleSection;
	let txInfo;
	let txData;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Transactions detail"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='transactions' />
			<NavigateBackBar type='transactions' />
		</>
	);

	if (loading) {
		txInfo = <TxInfoSkeleton />;
		txData = <TxDataSkeleton />;
	} else if (shouldRefetch && !_.isNil(data?.height)) {
		if (data?.height === 0) {
			if (countRefetchRef.current === 10) {
				clearTimeout(intervalRef.current);
				setShouldRefetch(false);
				return <NotFound message={"Sorry! Tx Not Found"} />;
			}

			intervalRef.current = setTimeout(refetch, 3000);
			countRefetchRef.current += 1;
			txInfo = <TxInfoSkeleton />;
			txData = <TxDataSkeleton />;
		} else {
			txInfo = <TxInfo data={data} />;
			txData = <TxData data={data} />;
		}
	} else {
		return <NotFound message={"Sorry! Tx Not Found"} />;
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("tx")}>
				{txInfo}
				{txData}
			</Container>
		</>
	);
};

SuccessTx.propTypes = {};

SuccessTx.defaultProps = {};

export default SuccessTx;