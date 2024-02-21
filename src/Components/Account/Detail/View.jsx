import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye, faBuilding, faEnvelope, faSquarePhone, faTable, faHome,
    faImage, faEllipsis, faRepeat, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faIdCard, faAddressBook, faContactCard, faChartPie, faKey
} from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getAccountDetailAPI } from "../../../API/Account";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormRegionField from "../../Reusable/FormRegionField";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputField from "../../Reusable/FormInputField";
import FormTextYesNoRow from "../../Reusable/FormRowTextYesNo";
import DataDisplayRowImage from "../../Reusable/DataDisplayRowImage";

import URLTextFormatter from "../../Reusable/EveryPage/URLTextFormatter";
import EmailTextFormatter from "../../Reusable/EveryPage/EmailTextFormatter";
import PhoneTextFormatter from "../../Reusable/EveryPage/PhoneTextFormatter";

import { EXECUTIVE_ROLE_ID, MANAGEMENT_ROLE_ID, FRONTLINE_ROLE_ID, ASSOCIATE_ROLE_ID, CUSTOMER_ROLE_ID } from "../../../Constants/App";


function AccountDetail() {
    ////
    ////
    ////

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onAccountDetailSuccess(response) {
        console.log("onAccountDetailSuccess: Starting...");
        setCurrentUser(response);
    }

    function onAccountDetailError(apiErr) {
        console.log("onAccountDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAccountDetailDone() {
        console.log("onAccountDetailDone: Starting...");
        setFetching(false);
    }

    ////
    //// BREADCRUMB
    ////

    const generateBreadcrumbItemLink = (currentUser) => {
        let dashboardLink;
        switch (currentUser.role) {
            case EXECUTIVE_ROLE_ID:
                dashboardLink = "/admin/dashboard";
                break;
            case MANAGEMENT_ROLE_ID:
                dashboardLink = "/admin/dashboard";
                break;
            case FRONTLINE_ROLE_ID:
                dashboardLink = "/admin/dashboard";
                break;
            case CUSTOMER_ROLE_ID:
                dashboardLink = "/dashboard";
                break;
            default:
                dashboardLink = "/501"; // Default or error handling
                break;
        }
        return dashboardLink;
    };

    const breadcrumbItems = {
        items: [
            { text: 'Dashboard', link: generateBreadcrumbItemLink(currentUser), isActive: false, icon: faGauge },
            { text: 'Account', link: '/account', icon: faUserCircle, isActive: true }
        ],
        mobileBackLinkItems: {
            link: generateBreadcrumbItemLink(currentUser),
            text: "Back to Dashboard",
            icon: faArrowLeft
        }
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            setFetching(true);
            setErrors({});
            getAccountDetailAPI(
                onAccountDetailSuccess,
                onAccountDetailError,
                onAccountDetailDone
            );
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL} />
    }

    return (
        <>
            <div className="container">
                <section className="section">
                    {/* Desktop Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={generateBreadcrumbItemLink(currentUser)} aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={generateBreadcrumbItemLink(currentUser)} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Users</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;User</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav className="box">

                        {/* Title + Options */}
                        {currentUser && <div className="columns">
                            <div className="column">
                                <p className="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Summary</p>
                            </div>
                            <div className="column has-text-right">
                                <Link to={`/account/edit`} className="button is-small is-warning is-fullwidth-mobile" type="button" disabled={currentUser.status === 2}>
                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                </Link>
                            </div>
                        </div>}

                        {/* <p className="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />

                                {currentUser && <div className="container">

                                    {/* Tab Navigation */}
                                    <div className= "tabs is-medium is-size-7-mobile">
                                        <ul>
                                            <li className="is-active">
                                                <Link>Detail</Link>
                                            </li>
                                            <li>
                                                <Link to={`/account/2fa`}>2FA</Link>
                                            </li>
                                            <li>
                                                <Link to={`/account/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <h1>TODO</h1>

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-fullwidth-mobile" to={generateBreadcrumbItemLink(currentUser)}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <Link to={`/account/edit`} className="button is-warning is-fullwidth-mobile" disabled={currentUser.status === 2}><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                        </div>
                                    </div>

                                </div>}
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AccountDetail;
