export default (list: Array<any> | any) => {
  if (!Array.isArray(list) && list.votering_id !== null) return true;

  for (let i = 0; i < list.length; i += 1) {
    if (list[i].votering_id !== null) return true;
  }
  return false;
};
