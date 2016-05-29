

let GROUPS = [];
let CALLBACKS = [];

/**
 * This "class" takes care of managing all the groups and
 * resettign the view when something goes wrong.
 */
let GroupManager = {
  init(source_url) {
    fetch(source_url)
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
    let old_group = GROUPS.find(g => g.id === alumn.groupId);
    if (!old_group)
      return false;

    let index = old_group.alumns.findIndex(a => a.id === alumn.id);
    if (index === -1)
      return false;

    let new_group = GROUPS.find(g => g.id === toGroup);
    console.log(new_group);
    if (!new_group)
      return false;

    old_group.alumns.splice(index, 1);
    new_group.alumns.push(alumn);
    this.dispatchUpdateCallbacks();
    return true;
  },
  onChange(callback) {
    if (typeof callback !== "function")
      throw new TypeError("Tried to subscribe without a fn");
    CALLBACKS.push(callback);
  },
  dispatchUpdateCallbacks() {
    CALLBACKS.forEach((c) => c(GROUPS))
  }
}

export default GroupManager;
