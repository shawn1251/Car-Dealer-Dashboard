import { createSelector } from 'reselect';

const selectSales = (state) => state.sales.data;
const selectInventory = (state) => state.inventory.data;
const selectUsers = (state) => state.users.data;

export const selectTotalSales = createSelector(
  [selectSales],
  (sales) => sales.length
);

export const selectTotalItems = createSelector(
    [selectInventory],
    (inventory) => inventory.filter(item => item.status === 'in-stock').length
);

export const selectUserCount = createSelector(
    [selectUsers],
    (users) => users.length
);

export const selectLatest10Sales = createSelector(
    [selectSales],
    (sales) => sales
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
);

export const selectLast5DaysSalesData = createSelector(
    [selectSales],
    (sales) => {
        const last5Days = Array.from({ length: 5 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        });
        const last5DaysSales = last5Days.map((day) => {
            return sales.reduce((acc, sale) => {
                if (sale.date.split('T')[0] === day) {
                    acc += 1;
                }
                return acc;
            }, 0);
        });
        const last5DaysSellingPrice = last5Days.map((day) => {
            return sales.reduce((acc, sale) => {
                if (sale.date.split('T')[0] === day) {
                    acc += sale.selling_price;
                }
                return acc;
            }, 0);
        });
        return { days: last5Days, sales: last5DaysSales, sellingPrices: last5DaysSellingPrice };
    }
);

export const selectMostPopularModels = createSelector(
    [selectSales],
    (sales) => {
        const modelCount = sales.reduce((acc, sale) => {
            const model = sale.vehicle.model;
            if (!acc[model]) {
                acc[model] = 0;
            }
            acc[model]++;
            return acc;
        }, {});

        const sortedModels = Object.entries(modelCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([model, count]) => ({ model, count }));

        return sortedModels;
    }
);
