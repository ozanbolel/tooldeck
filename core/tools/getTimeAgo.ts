export const getTimeAgo = (dateString: string) => {
  let result = "1 second ago";

  const timeCurrentDate = new Date().getTime();
  const timeDate = new Date(dateString).getTime();
  const timeDiff = timeCurrentDate - timeDate;

  const dividers = [
    {
      unit: "year",
      divider: 1000 * 60 * 60 * 24 * 365
    },
    {
      unit: "month",
      divider: 1000 * 60 * 60 * 24 * 30
    },
    {
      unit: "day",
      divider: 1000 * 60 * 60 * 24
    },
    {
      unit: "hour",
      divider: 1000 * 60 * 60
    },
    {
      unit: "minute",
      divider: 1000 * 60
    },
    {
      unit: "second",
      divider: 1000
    }
  ];

  for (let i = 0; i < dividers.length; i++) {
    const currentDiff = Math.floor(timeDiff / dividers[i].divider);
    const currentUnit = dividers[i].unit;

    if (currentDiff > 0) {
      if (currentDiff === 1) {
        result = `${currentDiff} ${currentUnit} ago`;
      } else {
        result = `${currentDiff} ${currentUnit}s ago`;
      }

      break;
    }
  }

  return result;
};
