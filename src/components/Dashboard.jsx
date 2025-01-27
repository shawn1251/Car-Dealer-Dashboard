import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetUsersQuery,
  useGetSalesQuery,
  useGetInventoryQuery,
} from '../store/api';
import {
  setUserCount,
  setTotalSales,
  setTotalItems,
} from '../store/slices/statsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  // 使用 RTK Query 獲取數據，並設置 pollingInterval 實現週期性更新
  const { data: users } = useGetUsersQuery(undefined, { pollingInterval: 10000 }); // 每 5 秒更新一次
  const { data: sales } = useGetSalesQuery(undefined, { pollingInterval: 10000 });
  const { data: inventory } = useGetInventoryQuery(undefined, {
    pollingInterval: 10000,
  });

  const { userCount, totalSales, totalItems } = useSelector(
    (state) => state.stats
  );


  useEffect(() => {
    if (users) {
      dispatch(setUserCount(users.length));
    }
  }, [users, dispatch]);

  useEffect(() => {
    if (sales) {
      dispatch(setTotalSales(sales.length));
    }
  }, [sales, dispatch]);

  useEffect(() => {
    if (inventory) {
      let inStockTotal = 0
      for (const item of inventory) {
        if (item.status == "in-stock") {
            inStockTotal += 1;
              }
            }
      dispatch(setTotalItems(inStockTotal));
    }
  }, [inventory, dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User Count: {userCount}</p>
      <p>Total Sales: {totalSales}</p>
      <p>Total Items: {totalItems}</p>
    </div>
  );
};

export default Dashboard;