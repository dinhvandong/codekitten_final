import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';
import mystuffIcon from './icon--mystuff.png';

import communityIcon from './icon--see-community.svg';
import styles from './community-button.css';

const CommunityButton = ({
    className,
    onClick
}) => (
    <Button
        className={classNames(
            className,
            styles.communityButton
        )}

        //  className={styles.menuBarButton}

        iconClassName={styles.communityButtonIcon}
        iconSrc={mystuffIcon}
        onClick={onClick}
    >
       Dự án của bạn
    </Button>
);

CommunityButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

CommunityButton.defaultProps = {
    onClick: () => {}
};

export default CommunityButton;
