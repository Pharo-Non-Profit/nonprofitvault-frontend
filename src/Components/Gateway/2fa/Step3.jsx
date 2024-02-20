import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faArrowLeft, faArrowRight, faEnvelope, faKey, faTriangleExclamation, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import QRCode from "qrcode.react";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { postVertifyOTP } from "../../../API/Gateway";
import { currentOTPResponseState, currentUserState } from "../../../AppState";
import FormInputField from "../../Reusable/FormInputField";
import { EXECUTIVE_ROLE_ID, MANAGEMENT_ROLE_ID, FRONTLINE_ROLE_ID, ASSOCIATE_ROLE_ID, CUSTOMER_ROLE_ID } from "../../../Constants/App";


function TwoFactorAuthenticationWizardStep3() {
    ////
    //// Global state.
    ////

    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
    const [otpResponse] = useRecoilState(currentOTPResponseState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [forceURL, setForceURL] = useState("");
    const [verificationToken, setVerificationToken] = useState("");

    ////
    //// API.
    ////

    function onVerifyOPTSuccess(response){
        console.log("onVerifyOPTSuccess: Starting...");
        console.log("response: ", response);
        // setOtpResponse(response);

    }

    function onVerifyOPTError(apiErr) {
        console.log("onVerifyOPTError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onVerifyOPTDone() {
        console.log("onVerifyOPTDone: Starting...");
    }

    ////
    //// Event handling.
    ////

    function onButtonClick(e) {
        postVertifyOTP(
            verificationToken,
            onVerifyOPTSuccess,
            onVerifyOPTError,
            onVerifyOPTDone
        );
    }


    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
        }

        return () => mounted = false;
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div className="container column is-12">
                <div className="section">


                    <section className="hero is-fullheight">
                        <div className="hero-body">
                            <div className="container">
                                <div className="columns is-centered">
                                    <div className="column is-half-tablet">
                                        <div className="box is-rounded">
                                            {/* Progress Wizard */}
                                            <nav className="box has-background-light" >
                                                <p className="subtitle is-5">Step 3 of 3</p>
                                                <progress class="progress is-success" value="100" max="100">100%</progress>
                                            </nav>

                                            {/* Page */}
                                            <form>
                                                <h1 className="title is-3 has-text-centered">Two-Factor Authentication (2FA)</h1>
                                                <FormErrorBox errors={errors} />
                                                <p class="has-text-grey">Open the two-step verification app on your mobile device to get your verification code.</p>
                                                <p>&nbsp;</p>
                                                <FormInputField
                                                    label="Enter your Verification Token"
                                                    name="verificationToken"
                                                    placeholder="See your authenticator app"
                                                    value={verificationToken}
                                                    errorText={errors && errors.verificationToken}
                                                    helpText=""
                                                    onChange={(e)=>setVerificationToken(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />
                                                <br />
                                            </form>


                                            <nav class="level">
                                                <div class="level-left">
                                                    <div class="level-item">
                                                        <Link class="button is-link is-fullwidth-mobile" to="/login/2fa/step-2"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Back</Link>
                                                    </div>
                                                </div>
                                                <div class="level-right">
                                                    <div class="level-item">
                                                        <button type="button" class="button is-primary is-fullwidth-mobile" onClick={onButtonClick}>
                                                            <FontAwesomeIcon icon={faCheckCircle} />&nbsp;Subit and Verify
                                                        </button>
                                                    </div>
                                                </div>
                                            </nav>

                                        </div>
                                        {/* End box */}

                                        <div className="has-text-centered">
                                            <p>© 2024 Capsule.</p>
                                        </div>
                                        {/* End suppoert text. */}

                                    </div>
                                    {/* End Column */}
                                </div>
                            </div>
                            {/* End container */}
                        </div>
                        {/* End hero-body */}
                    </section>

                </div>
            </div>
        </>
    );
}

export default TwoFactorAuthenticationWizardStep3;
