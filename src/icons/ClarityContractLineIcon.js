import React from "react";
import PropTypes from "prop-types";

const ClarityContractLineIcon = ({ className, width = 24, height = 24 }) => {
    return (
        <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.3334 5.46667H16.0001V6.53334H5.3334V5.46667ZM5.3334 10.8H10.7241V11.8667H5.3334V10.8ZM15.5854 8.13334H5.3334V9.20001H14.5194L15.5854 8.13334ZM8.52873 19.3813C8.70805 19.587 8.93564 19.7448 9.19106 19.8407C9.44649 19.9366 9.72173 19.9675 9.99206 19.9307H15.1941C15.3178 19.9307 15.4365 19.8815 15.524 19.794C15.6116 19.7065 15.6607 19.5878 15.6607 19.464C15.6607 19.3402 15.6116 19.2215 15.524 19.134C15.4365 19.0465 15.3178 18.9973 15.1941 18.9973H9.99206C9.38473 18.9867 9.49273 18.4593 9.57806 18.296C9.68932 18.1043 9.776 17.8994 9.83606 17.686C9.87592 17.5143 9.85714 17.3343 9.7827 17.1745C9.70827 17.0148 9.58248 16.8846 9.4254 16.8047C9.17303 16.691 8.89036 16.6631 8.62065 16.7254C8.35094 16.7876 8.10907 16.9365 7.93206 17.1493C7.70273 17.386 7.38406 17.748 7.07873 18.1C7.2674 17.3607 7.51206 16.412 7.75206 15.4867C7.82084 15.2758 7.80715 15.0468 7.71375 14.8456C7.62035 14.6445 7.45418 14.4862 7.24873 14.4027C7.0212 14.3246 6.77254 14.3358 6.55291 14.4339C6.33329 14.532 6.15906 14.7098 6.0654 14.9313C5.7774 15.4853 3.4974 19.306 3.47473 19.3447C3.4433 19.3973 3.42254 19.4556 3.41364 19.5162C3.40474 19.5769 3.40787 19.6387 3.42285 19.6981C3.43783 19.7575 3.46437 19.8134 3.50095 19.8626C3.53754 19.9118 3.58345 19.9532 3.63606 19.9847C3.74233 20.0482 3.86945 20.0668 3.98948 20.0366C4.1095 20.0063 4.21259 19.9296 4.27606 19.8233C4.3614 19.68 6.1814 16.6313 6.7554 15.6133C6.3234 17.28 5.8474 19.1347 5.8194 19.3013C5.78788 19.4239 5.79734 19.5534 5.84633 19.67C5.89533 19.7867 5.98117 19.8841 6.09073 19.9473C6.21276 20.0079 6.35147 20.026 6.48498 19.999C6.61849 19.972 6.73919 19.9012 6.82806 19.798C6.91206 19.722 7.0694 19.5413 7.46606 19.0807C7.83564 18.646 8.21417 18.219 8.6014 17.8C8.74673 17.6467 8.83473 17.7147 8.7494 17.8653C8.58248 18.0763 8.47422 18.3276 8.43559 18.5938C8.39696 18.86 8.42932 19.1317 8.5294 19.3813H8.52873Z" fill="#767F8D" />
            <path d="M18.6666 14.4634V21.3334H2.66659V2.66671H18.6666V5.99537L19.5533 5.10871C19.6897 4.97409 19.8394 4.85348 19.9999 4.74871V2.00004C19.9999 1.82323 19.9297 1.65366 19.8047 1.52864C19.6796 1.40361 19.5101 1.33337 19.3333 1.33337H1.99992C1.82311 1.33337 1.65354 1.40361 1.52851 1.52864C1.40349 1.65366 1.33325 1.82323 1.33325 2.00004V22C1.33325 22.1769 1.40349 22.3464 1.52851 22.4714C1.65354 22.5965 1.82311 22.6667 1.99992 22.6667H19.3333C19.5101 22.6667 19.6796 22.5965 19.8047 22.4714C19.9297 22.3464 19.9999 22.1769 19.9999 22V14.2847C19.591 14.5014 19.1181 14.5648 18.6666 14.4634Z" fill="#767F8D" />
            <path d="M22.7519 7.9073L22.4032 7.55863C22.5814 7.32314 22.6717 7.03273 22.6583 6.73772C22.6449 6.44271 22.5287 6.16167 22.3299 5.9433C22.0719 5.71585 21.7344 5.59958 21.391 5.61981C21.0476 5.64004 20.7261 5.79513 20.4966 6.05129L12.1466 14.4L11.5886 16.4946C11.5797 16.522 11.5787 16.5514 11.5855 16.5793C11.5923 16.6073 11.6067 16.6329 11.6271 16.6532C11.6476 16.6734 11.6732 16.6877 11.7012 16.6943C11.7293 16.7009 11.7586 16.6996 11.7859 16.6906L13.8732 16.126L21.6679 8.33129L21.9972 8.66129C22.0202 8.68427 22.0385 8.71155 22.0509 8.74157C22.0634 8.7716 22.0698 8.80379 22.0698 8.8363C22.0698 8.8688 22.0634 8.90099 22.0509 8.93102C22.0385 8.96104 22.0202 8.98832 21.9972 9.0113L18.7192 12.2893C18.6193 12.3894 18.5631 12.5251 18.5632 12.6665C18.5632 12.808 18.6195 12.9436 18.7196 13.0436C18.8196 13.1436 18.9553 13.1998 19.0968 13.1997C19.2383 13.1996 19.3739 13.1434 19.4739 13.0433L22.7519 9.7653C22.9983 9.51877 23.1367 9.1845 23.1367 8.83596C23.1367 8.48743 22.9983 8.15315 22.7519 7.90663V7.9073Z" fill="#767F8D" />
        </svg>

    );
};

ClarityContractLineIcon.propTypes = {
    className: PropTypes.string,
};

ClarityContractLineIcon.defaultProps = {
    className: "",
};
export default ClarityContractLineIcon;