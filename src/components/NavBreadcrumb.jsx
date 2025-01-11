// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import PropTypes from 'prop-types';
NavBreadcrumb.propTypes = {
    content: PropTypes.string,
    hidden: PropTypes.string,
};
export default function NavBreadcrumb(props) {
    return (
        <nav aria-label="breadcrumb" id="nav-breadcrumb" className={`font-bold bg-black ${props.hidden}`}>
            <span id="breadcrumb" className="mr-4 ml-4 font-bold">{props.content}</span>
        </nav>
    )
}
