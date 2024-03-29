import React from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';


function DataDisplayRowText(props) {
    const { label, urlKey, urlValue, helpText, type=""} = props;
    return (
        <div className="field pb-4">
            <label className="label">{label}</label>
            <div className="control">
                <p>
                    {urlKey && urlValue
                        ?
                        <>
                            {type === "external" &&
                                <Link target="_blank" rel="noreferrer" to={urlValue}>{urlKey}&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} /></Link>
                            }
                            {type !== "external" &&
                                <Link to={urlValue}>{urlKey}</Link>
                            }
                        </>
                        :
                        "-"
                    }
                </p>
                {helpText !== undefined && helpText !== null && helpText !== "" && <p className="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default DataDisplayRowText;
