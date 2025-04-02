import type { Sale } from "../components/columns";

<<<<<<< HEAD
export const sampleData = [
  {
    id: "3",
    date: "Sun 24 Nov 2024",
    time: "12:24 pm",
    itemName: "Solace Recliner",
    quantitySold: 3,
    sellPrice: 156000,
    profit: 20000,
  },
  {
    id: "4",
    date: "Sun 24 Nov 2024",
    time: "12:24 pm",
    itemName: "White Center Table",
    quantitySold: 3,
    sellPrice: 130000,
    profit: 20000,
  },
  {
    id: "5",
    date: "Sun 24 Nov 2024",
    time: "15:24 pm",
    itemName: "Solace Recliner",
    quantitySold: 3,
    sellPrice: 156000,
    profit: 20000,
  },
  {
    id: "6",
    date: "Sun 23 Nov 2024",
    time: "11:05 pm",
    itemName: "Aurora Arm Chair",
    quantitySold: 3,
    sellPrice: 130000,
    profit: 20000,
  },
];

export function processDataIntoGroups(data: Sale[]) {
  // Sort data by date and time
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(`${a.date} ${a.time}`).getTime() -
      new Date(`${b.date} ${b.time}`).getTime()
  );

  // Group data by time
  const groupedByTime = sortedData.reduce((acc, item) => {
    const key = `${item.date} ${item.time}`;
    if (!acc[key]) {
      acc[key] = {
        timeKey: key,
        date: item.date,
        time: item.time,
        items: [],
        total: {
          id: `total-${key}`,
          date: item.date,
          time: item.time,
          itemName: "Total",
          quantitySold: 0,
          sellPrice: 0,
          profit: 0,
        },
      };
    }
    acc[key].items.push(item);
    acc[key].total.quantitySold += item.quantitySold;
    acc[key].total.sellPrice += item.sellPrice * item.quantitySold;
    acc[key].total.profit += item.profit || 0;
    return acc;
  }, {} as Record<string, { date: string; time: string; timeKey: string; items: Sale[]; total: Sale }>);
=======
export function processDataIntoGroups(data: Sale[]) {
  // Group data by time without re-sorting
  const groupedByTime = data.reduce(
    (acc, item) => {
      const key = `${item.date} ${item.time}`;
      if (!acc[key]) {
        acc[key] = {
          timeKey: key,
          items: [],
          total: {
            id: `total-${key}`,
            date: item.date,
            time: item.time,
            itemName: 'Total',
            quantitySold: 0,
            sellPrice: 0,
            profit: 0,
          },
        };
      }
      acc[key].items.push(item);
      acc[key].total.quantitySold += item.quantitySold;
      acc[key].total.sellPrice += item.sellPrice * item.quantitySold;
      acc[key].total.profit += item.profit || 0;
      return acc;
    },
    {} as Record<string, { timeKey: string; items: Sale[]; total: Sale }>
  );
>>>>>>> f526f85f0d2d5116ed4a3f26a97de101307ab875

  // Convert to array and maintain order from the input data
  return Object.values(groupedByTime);
}
