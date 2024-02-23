import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faShare, faCloud, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faFile, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { postSmartFolderOperationSharableLinkAPI } from "../../../../API/SmartFolder";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";

const EXPIRES_IN_OPTIONS = [
    { value: 0, label: 'Please select an option' },
    { value: 1, label: '1 Hour' },
    { value: 6, label: '6 Hours' },
    { value: 12, label: '12 Hours' },
    { value: 24, label: '1 Day' },
    { value: 24*3, label: '3 Days' },
    { value: 24*7, label: '1 Week' },
    { value: 24*7*2, label: '2 Weeks' },
];

function ShareSmartFolderModal({ showShareModalForSmartFolderID, setShowShareModalForSmartFolderID, smartFolderName, onSuccessCompletionCallback, onErrorCompletionCallback }) {
    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    // Page states.
    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");

    // Data states.
    const [expiresIn, setExpiresIn] = useState("");
    const [sharableURL, setSharableURL] = useState("");

    ////
    //// Event handling.
    ////

    const onCopyLinkButtonClick = () => {
        try {
            // The following code will copy the text into the user's clipboard.
            navigator.clipboard.writeText(sharableURL);
        } catch (err) {
            console.log("onCopyLinkButtonClick: err:", err);
        }
    }

    const onGenerateLinkButtonClick = () => {
        console.log("onGenerateLinkButtonClick: starting...");
        postSmartFolderOperationSharableLinkAPI(
            {
                smart_folder_id: showShareModalForSmartFolderID,
                expires_in: expiresIn,
            },
            onGenerateSharableLinkSuccess,
            onGenerateSharableLinkError,
            onGenerateSharableLinkDone,
        );
        console.log("onGenerateLinkButtonClick: finished.");
    }

    const onCloseModal = () => {
        setShowShareModalForSmartFolderID("");
        setErrors({});
        setFetching(false);
        setExpiresIn("");
        setSharableURL("");
    }

    ////
    //// API.
    ////

    const onGenerateSharableLinkSuccess = (response) => {
        // For debugging purposes only.
        console.log("onGenerateSharableLinkSuccess: Starting...");
        console.log("onGenerateSharableLinkSuccess: response:", response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Sharable link created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onGenerateSharableLinkSuccess: Delayed for 2 seconds.");
            console.log("onGenerateSharableLinkSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        setErrors({});
        setSharableURL(response.url)
        console.log("onGenerateSharableLinkSuccess: Finished.");
    }

    const onGenerateSharableLinkError = (apiErr) => {
        console.log("onGenerateSharableLinkError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onGenerateSharableLinkError: Delayed for 2 seconds.");
            console.log("onGenerateSharableLinkError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
        console.log("onGenerateSharableLinkError: Finished.");
    }

    const onGenerateSharableLinkDone = (response) => {
        console.log("onGenerateSharableLinkDone: Starting...");
        setFetching(false);
        console.log("onGenerateSharableLinkDone: Finished.");
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div className={`modal ${showShareModalForSmartFolderID ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            <FontAwesomeIcon className="mdi" icon={faShare} />&nbsp;Share "{smartFolderName}" Smart Folder
                        </p>
                        <button className="delete" aria-label="close" onClick={onCloseModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <FormErrorBox errors={errors} />
                        {sharableURL === "" && <FormSelectField
                            label="Expires In"
                            name="expiresIn"
                            placeholder="Pick expires in"
                            selectedValue={expiresIn}
                            helpText=""
                            onChange={(e)=>setExpiresIn(parseInt(e.target.value))}
                            options={EXPIRES_IN_OPTIONS}
                            isRequired={true}
                        />}
                        {sharableURL &&
                            <div class="notification is-primary is-light">
                                Sharable link created successfully! Click the <strong>Copy link</strong> button to save the link to your clipboard.
                                <br />
                                <br />
                                <strong>Link:</strong>&nbsp;{sharableURL}
                            </div>
                        }
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button" onClick={onCloseModal}>Done</button>
                        {sharableURL
                            ? <button className="button is-success" onClick={onCopyLinkButtonClick} ><FontAwesomeIcon className="mdi" icon={faLink} />&nbsp;Copy link</button>
                            : <button className="button is-primary" onClick={onGenerateLinkButtonClick} ><FontAwesomeIcon className="mdi" icon={faCheckCircle} />&nbsp;Generate sharable link</button>
                        }
                    </footer>
                </div>
            </div>
        </>
    );
}

export default ShareSmartFolderModal;