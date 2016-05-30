

let GROUPS = [];
let CALLBACKS = [];

/**
 * This 'class' takes care of managing all the groups and
 * resettign the view when something goes wrong.
 */
let GroupManager = {
  init(sourceUrl) {
    fetch(sourceUrl)
      .then(response => response.json())
      .then(groups => this.setGroups(groups.groups))
      .catch(err => console.error(err));
  },
  setGroups(groups) {
    GROUPS = groups;
    this.dispatchUpdateCallbacks();
  },
  // TODO: switch to hashmaps to make this more performant?
  moveAlumn(alumn, toGroup) {
    let oldGroup = GROUPS.find(g => g.id === alumn.groupId);
    if (!oldGroup) {
      return false;
    }

    let index = oldGroup.alumns.findIndex(a => a.id === alumn.id);
    if (index === -1) {
      return false;
    }

    let newGroup = GROUPS.find(g => g.id === toGroup);
    if (!newGroup) {
      return false;
    }

    oldGroup.alumns.splice(index, 1);
    newGroup.alumns.push(alumn);
    this.dispatchUpdateCallbacks();
    return true;
  },
  onChange(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Tried to subscribe without a fn');
    }
    CALLBACKS.push(callback);
  },
  dispatchUpdateCallbacks() {
    CALLBACKS.forEach(c => c(GROUPS));
  }
};

export default GroupManager;
