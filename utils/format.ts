import moment from "moment";

export function format(items: any[]) {
  const dates: { date: string; info: any; data: any[] }[] = [];

  items.forEach((item) => {
    item.seanses.forEach((seanse) => {
      const isDayExists = dates.some(
        (date) =>
          moment(date.date).format("YYYY-DD-MM") ===
          moment(seanse.date).format("YYYY-DD-MM")
      );

      if (isDayExists) {
        dates.map((date) => {
          if (
            moment(date.date).format("YYYY-DD-MM") ===
            moment(seanse.date).format("YYYY-DD-MM")
          ) {
            return { ...date, data: [...date.data, seanse] };
          }
          return date;
        });
      } else {
        const formatedItem = {
          ...item,
          poster: item.poster || item.img_sobitiya,
        };
        const dateTemp = {
          date: moment(seanse.date).format("YYYY-MM-DD"),
          data: [seanse],
          info: { ...formatedItem },
        };
        dates.push(dateTemp);
      }
    });
  });

  return dates.sort((a, b) => new Date(a.date) - new Date(b.date));
}
