export default list => {
  if (!Array.isArray(list)) list = [list];
  for (let i = 0; i < list.length; i++) {
    if (list[i].votering_id != null) return true;
  }
  return false;
};
