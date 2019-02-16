export default list => {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(list)) list = [list];
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].votering_id != null) return true;
  }
  return false;
};
