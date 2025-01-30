import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, ToolboxComponent, LegendComponent } from 'echarts/components';
import { BarChart, LineChart as ELineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, ToolboxComponent, LegendComponent, BarChart, ELineChart, CanvasRenderer, UniversalTransition]);

const MixedLineBarChart = ({ option, style }) => {
  const chartRef = useRef(null);

  useEffect(() => {

    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    if (option) {
      myChart.setOption(option);
    }

    return () => {
      myChart.dispose();
    };
  }, [option]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px', ...style }} />;
};

export default MixedLineBarChart;