// @ts-nocheck
import React, {memo} from "react";
import copy from "copy-to-clipboard";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./RequestCardList.scss";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import TimesIcon from "src/icons/TimesIcon";
import {useDispatch} from "src/hooks";
import CopyIcon from "src/icons/CopyIcon";
import {showAlert} from "src/store/modules/global";

const RequestCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);
	const dispatch = useDispatch();
	return (
		<div className='request-card-list'>
			{data.map((item, index) => {
				let statusElement;
				if (_.isNil(item?.status)) {
					statusElement = <div className={cx("status")}>-</div>;
				} else {
					switch (item?.status) {
						case "success":
							statusElement = (
								<div className={cx("status")}>
									<CheckIcon className={cx("status-icon", "status-icon-success")} />
									<span className={cx("status-text")}>Success</span>
								</div>
							);
							break;
						case "pending":
							statusElement = (
								<div className={cx("status")}>
									<ClockIcon className={cx("status-icon", "status-icon-pending")} />
									<span className={cx("status-text")}>Pending</span>
								</div>
							);
							break;
						case "fail":
							statusElement = (
								<div className={cx("status")}>
									<TimesIcon className={cx("status-icon", "status-icon-fail")} />
									<span className={cx("status-text")}>Failed</span>
								</div>
							);
							break;
						default:
							break;
					}
				}
				return (
					<div className={cx("request-card-list-item")} key={"request-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Name</div>
									</td>
									<td>
										{_.isNil(item?.name) || item?.name === "" ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item?.name}</div>}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
									</td>
									<td>{_.isNil(item?.result) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item?.result}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Status</div>
									</td>
									<td>{statusElement}</td>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default RequestCardList;