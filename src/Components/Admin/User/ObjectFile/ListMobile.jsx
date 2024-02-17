import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS, OBJECT_FILE_STATES } from "../../../../Constants/FieldOptions";

/*
Display for both tablet and mobile.
*/
function AdminUserDetailObjectFileListMobile(props) {
    const { userID, listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectObjectFileForDeletion } = props;
    return (
        <>
            {listData && listData.results && listData.results.map(function(datum, i){
                return <div className="mb-5">
                    {i !== 0 && <hr />}
                    <strong>Name:</strong>&nbsp;{datum.name}
                    <br />
                    <br />
                    <strong>State:</strong>&nbsp;{OBJECT_FILE_STATES[datum.status]}
                    <br />
                    <br />
                    <strong>Created:</strong>&nbsp;{datum.createdAt}
                    <br />
                    <br />
                    <strong>File:</strong>&nbsp;
                    <a href={datum.objectUrl} target="_blank" rel="noreferrer" className="">
                        <FontAwesomeIcon className="mdi" icon={faDownload} />&nbsp;Download File
                    </a>
                    <br />
                    <br />

                    {/* Tablet only */}
                    <div className="is-hidden-mobile pt-2">
                        <div className="buttons is-right">
                            <Link to={`/admin/user/${userID}/attachment/${datum.id}`} className="button is-small is-primary" type="button">
                                View
                            </Link>
                            <Link to={`/admin/user/${userID}/attachment/${datum.id}/edit`} className="button is-small is-warning" type="button">
                                Edit
                            </Link>
                            <button onClick={(e, ses) => onSelectObjectFileForDeletion(e, datum)} className="button is-small is-danger" type="button">
                                <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                            </button>
                        </div>
                    </div>

                    {/* Mobile only */}
                    <div className="is-hidden-tablet pt-2">
                        <div className="columns is-mobile">
                            <div className="column">
                                <Link to={`/admin/user/${userID}/attachment/${datum.id}`} className="button is-small is-primary is-fullwidth" type="button">
                                    View
                                </Link>
                            </div>
                            <div className="column">
                                <Link to={`/admin/user/${userID}/attachment/${datum.id}/edit`} className="button is-small is-warning is-fullwidth" type="button">
                                    Edit
                                </Link>
                            </div>
                            <div className="column">
                                <button onClick={(e, ses) => onSelectObjectFileForDeletion(e, datum)} className="button is-small is-danger is-fullwidth" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                </button>
                            </div>
                        </div>
                    </div>

                </div>;
            })}

            <div className="columns pt-4">
                <div className="column is-half">
                    <span className="select">
                        <select className={`input has-text-grey-light`}
                                 name="pageSize"
                             onChange={(e)=>setPageSize(parseInt(e.target.value))}>
                            {PAGE_SIZE_OPTIONS.map(function(option, i){
                                return <option selected={pageSize === option.value} value={option.value}>{option.label}</option>;
                            })}
                        </select>
                    </span>

                </div>
                <div className="column is-half has-text-right">
                    {previousCursors.length > 0 &&
                        <button className="button" onClick={onPreviousClicked}>Previous</button>
                    }
                    {listData.hasNextPage && <>
                        <button className="button" onClick={onNextClicked}>Next</button>
                    </>}
                </div>
            </div>
        </>
    );
}

export default AdminUserDetailObjectFileListMobile;
