import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleRight, faMoneyBills, faUniversity, faArrowCircleUp, faMessage,
    faChevronRight, faPlus, faPencil, faTimes, faBullhorn,
    faArrowUpRightFromSquare, faNewspaper, faWrench, faHardHat, faUserCircle,
    faTasks, faGauge, faArrowRight, faUsers, faBarcode
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getDashboardAPI } from "../../../API/Gateway";
import { getSmartFolderListAPI } from "../../../API/SmartFolder";
import FormErrorBox from "../../Reusable/FormErrorBox";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import DateTextFormatter from "../../Reusable/EveryPage/DateTextFormatter";
import DateTimeTextFormatter from "../../Reusable/EveryPage/DateTimeTextFormatter";
import PageLoadingContent from "../../Reusable/PageLoadingContent";


function CustomerDashboard() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");

    ////
    //// API.
    ////



    ////
    //// Event handling.
    ////

    ////
    //// Misc.
    ////

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
        <div class="container">
            <section class="section">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li class="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                    </ul>
                </nav>
                <nav class="box">
                    <div class="columns">
                        <div class="column">
                            <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</h1>
                        </div>
                    </div>

                    <div className="container">
                        <div className="columns">

                            {/* Residential */}
                            <div className="column">
                                <div className="card">
                                    <div className="card-image has-background-info">
                                        <div className="has-text-centered" style={{padding:"60px"}}>
                                            <FontAwesomeIcon className="fas" icon={faUniversity} style={{ color: 'white', fontSize: '9rem' }} />
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="media">

                                          <div className="media-content">
                                            <p className="title is-3">Government</p>
                                          </div>
                                        </div>

                                        <div className="content">
                                            Begin uploading, sharing or reviewing previous uploaded government related documents by clicking below:
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <Link to={`/documents/goverment/${currentUser.country}`} className="card-footer-item button is-primary is-large">
                                           View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowCircleRight} />
                                        </Link>
                                    </footer>
                                </div>
                            </div>

                            {/* Business */}
                            <div className="column">
                                <div className="card">
                                    <div className="card-image has-background-info">
                                        <div className="has-text-centered" style={{padding:"60px"}}>
                                            <FontAwesomeIcon className="fas" icon={faMoneyBills} style={{ color: 'white', fontSize: '9rem' }} />
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="media">

                                          <div className="media-content">
                                            <p className="title is-3">Financial</p>
                                          </div>
                                        </div>

                                        <div className="content">
                                            Begin uploading, sharing or reviewing previous uploaded all financial related documents by clicking below:
                                            <br />
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <Link to={`/documents/financial`} className="card-footer-item button is-primary is-large">
                                           View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowCircleRight} />
                                        </Link>
                                    </footer>
                                </div>
                            </div>

                        </div>

                    </div>


                </nav>
            </section>
        </div>
    );
}

export default CustomerDashboard;
