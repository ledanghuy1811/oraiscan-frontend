import React, {memo, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorTable.scss";
import sortNoneIcon from "src/assets/common/sort_none_ic.svg";

const ValidatorTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const rankHeaderCell = <div className={cx("rank-header-cell", "align-center")}>Rank</div>;
	const validatorHeaderCell = (
		<div className={cx("header-cell", "align-left")}>
			Validator
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);
	const votingPowerHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Voting power
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);
	const cumulativeShareHeaderCell = <div className={cx("header-cell", "align-right")}>Cumulative Share %</div>;
	const uptimeHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Uptime
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);
	const commissionHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Commission
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);
	const headerCells = [rankHeaderCell, validatorHeaderCell, votingPowerHeaderCell, cumulativeShareHeaderCell, uptimeHeaderCell, commissionHeaderCell];
	const headerCellStyles = [
		{width: "80px"}, // Rank
		{minWidth: "200px"}, // Validator
		{width: "155px"}, // Voting Power
		{width: "250px"}, // Cumulative Share
		{width: "180px"}, // Uptime
		{width: "150px"}, // Commission
	];
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const rankDataCell = (
				<div className={cx("skeleton-data-cell", "align-center")}>
					<Skeleton />
				</div>
			);

			const validatorDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			let votingPowerDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const cumulativeShareDataCell = (
				<div className={cx("skeleton-data-cell", "align-center")}>
					<Skeleton />
				</div>
			);

			const uptimeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const commissionDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			dataRows.push([rankDataCell, validatorDataCell, votingPowerDataCell, cumulativeShareDataCell, uptimeDataCell, commissionDataCell]);
		}
		return dataRows;
	};

	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerCellStyles} headerCells={headerCells} dataRows={dataRows} />;
});

export default ValidatorTableSkeleton;