import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import {TextField, InputAdornment, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import cn from "classnames/bind";

import {ReactComponent as UploadIcon} from "src/assets/icons/upload.svg";

import styles from "./index.scss";

const cx = cn.bind(styles);

function FormInput(props) {
	const {control} = useFormContext();
	const {name, placeholder, label, required, errorobj} = props;
	let isError = false;
	let errorMessage = "";
	if (errorobj && errorobj.hasOwnProperty(name)) {
		isError = true;
		errorMessage = errorobj[name].message;
	}

	return (
		<Controller
			as={TextField}
			name={name}
			control={control}
			placeholder={placeholder || ""}
			label={label}
			fullWidth
			className={cx("input-text")}
			InputLabelProps={{
				className: cx({"required-label": required}),
				required: required || false,
				shrink: true,
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<IconButton>
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position='start'>
						<IconButton>
							<UploadIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
			error={isError}
			helperText={errorMessage}
			{...props}
		/>
	);
}

export default FormInput;