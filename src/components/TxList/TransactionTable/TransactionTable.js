import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatInteger} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TransactionTable.scss";
import successIcon from "src/assets/transactions/success_ic.svg";
import failureIcon from "src/assets/transactions/fail_ic.svg";
import moreIcon from "src/assets/transactions/tx_more_btn.svg";

const TransactionTable = memo(({data = []}) => {
	const cx = classNames.bind(styles);
	const txHashHeaderCell = <div className={cx("tx-hash-header-cell")}>TxHash</div>;
	const typeHeaderCell = <div className={cx("type-header-cell")}>Type</div>;
	const resultHeaderCell = <div className={cx("result-header-cell")}>Result</div>;
	const amountHeaderCell = <div className={cx("amount-header-cell")}>Amount</div>;
	const feeHeaderCell = <div className={cx("fee-header-cell")}>Fee</div>;
	const heightHeaderCell = <div className={cx("height-header-cell")}>Height</div>;
	const timeHeaderCell = <div className={cx("time-header-cell")}>Time</div>;
	const headerCells = [txHashHeaderCell, typeHeaderCell, resultHeaderCell, amountHeaderCell, feeHeaderCell, heightHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{minWidth: "350px"}, // Tx hash header cell
	];
	const getDataRows = data =>
		data.map(item => {
			const txHashDataCell = _.isNil(item?.tx_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("tx-hash-data-cell")} to={`${consts.API.TXLIST}/${item.tx_hash}`}>
					{reduceString(item.tx_hash, 6, 6)}
				</NavLink>
			);

			const typeDataCell = _.isNil(item?.messages?.[0]?.type) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{item.messages[0].type}</div>
					{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
				</div>
			);

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell")}>
					{item?.result ? (
						<>
							<img src={successIcon} alt='success' />
							<p>Success</p>
						</>
					) : (
						<>
							<img src={failureIcon} alt='failure' />
							<p>Failure</p>
						</>
					)}
				</div>
			);

			const amountDataCell =
				_.isNil(item?.messages?.[0]?.value?.amount?.[0]?.denom) || _.isNil(item?.messages?.[0]?.value?.amount?.[0]?.amount) ? (
					<NavLink to={`${consts.API.TXLIST}/${item.tx_hash}`} className={cx("amount-data-cell")}>
						<p>More</p>
						<img src={moreIcon} alt='more' />
					</NavLink>
				) : (
					<div className={cx("amount-data-cell")}>
						<span>{formatInteger(item.messages[0].value.amount[0].amount)} </span>
						<span>{item.messages[0].value.amount[0].denom}</span>
					</div>
				);

			const feeDataCell =
				_.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("fee-data-cell")}>
						<span>{formatInteger(item.fee.amount[0].amount)}</span>
						<span className={cx("blueColor", "uppercase")}>{item.fee.amount[0].denom}</span>
					</div>
				);

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<NavLink className={cx("height-data-cell")} to={`${consts.API.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);
			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell")}>{setAgoTime(item.timestamp)}</div>
			);
			return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell];
		});

	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} headerCellStyles={headerCellStyles} />;
});

export default TransactionTable;