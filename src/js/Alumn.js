import React, {Component} from 'react';
import 'css/alumn';

const AVATAR_WIDTH_PX = 125;

/**
 * This is the small icon at the right that shows the alumn state.
 *
 * Read below for more info.
 */
class AlumnState extends Component {
  render() {
    let assignedState = "unknown";

    if (this.props.wanted)
      assignedState = this.props.wanted == this.props.current ? "assigned" :
                                                                "unassigned";

    return (
      <span data-wanted={this.props.wanted}
            className={"alumn-state alumn-state--" + assignedState}>
      </span>
    );
  }
}

/**
 * The state of the alumn is dead simple.
 *
 * He can be in the group he/she wants, or not, and we might or might not know
 * about what group he/she wants.
 *
 * Thus, we have three possible states:
 *
 *   * He's in the group he wants and we know about it.
 *   * He's not in the group he wants and we know about it.
 *   * We don't know in which group he prefers to be.
 *
 * We obtain the group from the parent, and the wantedGroup from the data, so
 * it's trivial to determine the state.
 */
export default class Alumn extends Component {
  constructor() {
    super();
  }

  render() {
    // TODO: This dummy image url is just to generate dummy images and should
    // use this.props.imageUrl
    let imageUrl = "https://api.adorable.io/avatars/" + AVATAR_WIDTH_PX + "/" + encodeURIComponent(this.props.name);

    return (
      <div className="alumn">
        <img src={imageUrl} className="alumn-avatar" />
        <h3 className="alumn-name">{this.props.name}</h3>
        <span className="alumn-id">{this.props.id}</span>
        <AlumnState wanted={this.props.wantedGroupId} current={this.props.groupId} />
      </div>
    );
  }
}

