/* @flow strict-local */
import { connect } from 'react-redux';

import React, { PureComponent } from 'react';

import type { Presence, Style } from '../types';
import { getPresence } from '../selectors';
import { presenceToHumanTime } from '../utils/presence';
import { RawLabel } from '../common';

type Props = {
  color?: string,
  presence: Presence,
  style: Style,
};

class ActivityText extends PureComponent<Props> {
  props: Props;

  render() {
    const { style, presence, color } = this.props;

    if (!presence) {
      return null;
    }

    const activity = presenceToHumanTime(presence);

    return (
      <RawLabel style={[style, color !== undefined && { color }]} text={`Active ${activity}`} />
    );
  }
}

export default connect((state, props) => ({
  presence: getPresence(state)[props.email],
}))(ActivityText);
