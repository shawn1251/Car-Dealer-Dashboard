import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetUsersQuery,
  useGetSalesQuery,
  useGetInventoryQuery,
} from '../store/api';

import { setUser } from '../store/slices/userSlice';
import { setSales } from '../store/slices/salesSlice';
import { setInventory } from '../store/slices/inventorySlice';

import { selectUserCount, selectTotalSales, selectTotalItems, selectMostPopularModels, selectLast5DaysSalesData} from '../store/selectors/statsSelector';

import Card from './Card';
import LineChart from './LineChart';
import { getLineChartOptions, getMixedLineBarChartOptions } from './chartOptions';
import MixedLineBarChart from './MixedLineBarChart';
import { RETRY_DELAY, UPDATE_INTERVAL } from '../../config';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userPollingInterval, setUserPollingInterval] = useState(UPDATE_INTERVAL);
  const [salesPollingInterval, setSalesPollingInterval] = useState(UPDATE_INTERVAL);
  const [inventoryPollingInterval, setInventoryPollingInterval] = useState(UPDATE_INTERVAL);

  const { data: users, error: userError } = useGetUsersQuery(undefined, { pollingInterval: userPollingInterval });
  const { data: sales, error: salesError } = useGetSalesQuery(undefined, { pollingInterval: salesPollingInterval });
  const { data: inventory, error: inventoryError } = useGetInventoryQuery(undefined, { pollingInterval: inventoryPollingInterval });

  // State to track the last successful update time for each API call
  const [lastUserUpdate, setLastUserUpdate] = useState(null);
  const [lastSalesUpdate, setLastSalesUpdate] = useState(null);
  const [lastInventoryUpdate, setLastInventoryUpdate] = useState(null);
  useEffect(() => {
    if (users) {
      dispatch(setUser(users));
      setLastUserUpdate(new Date());
      setUserPollingInterval(UPDATE_INTERVAL);
    } else if (userError) {
      setUserPollingInterval(RETRY_DELAY);
    }
  }, [users, userError, dispatch]);

  useEffect(() => {
    if (sales) {
      dispatch(setSales(sales));
      setLastSalesUpdate(new Date());
      setSalesPollingInterval(UPDATE_INTERVAL);
    } else if (salesError) {
      setSalesPollingInterval(RETRY_DELAY);
    }
  }, [sales, salesError, dispatch]);

  useEffect(() => {
    if (inventory) {
      dispatch(setInventory(inventory));
      setLastInventoryUpdate(new Date());
      setInventoryPollingInterval(UPDATE_INTERVAL);
    } else if (inventoryError) {
      setInventoryPollingInterval(RETRY_DELAY);
    }
  }, [inventory, inventoryError, dispatch]);

  const lineChartOption = useMemo(() => getLineChartOptions(), []);
  
  const userCount = useSelector(selectUserCount);
  const totalSales = useSelector(selectTotalSales);
  const totalItems = useSelector(selectTotalItems);
  const mostPopularModels = useSelector(selectMostPopularModels);
  const last5DaysSalesData = useSelector(selectLast5DaysSalesData);
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <p>Last User Update: {lastUserUpdate ? lastUserUpdate.toLocaleString() : 'No data yet'}</p>
        <p>Last Sales Update: {lastSalesUpdate ? lastSalesUpdate.toLocaleString() : 'No data yet'}</p>
        <p>Last Inventory Update: {lastInventoryUpdate ? lastInventoryUpdate.toLocaleString() : 'No data yet'}</p>
      </div>
      <Card title="Users" value={userCount} />
      <Card title="Total Sales" value={totalSales} />
      <Card title="Total Items in Stock" value={totalItems} />
      <LineChart option={lineChartOption}/>
    
        {/* <MixedLineBarChart option={(getMixedLineBarChartOptions())}/>   */}
    </div>
  );
};

export default Dashboard;