const isToolNew = (createdAt: Date | undefined) => {
  const dayThreshold = 7;

  return createdAt ? (new Date().getTime() - new Date(createdAt).getTime()) / 86400000 <= dayThreshold : false;
};

export default isToolNew;
