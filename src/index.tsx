import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useNativeEffect } from 'remax'
import * as echarts from 'echarts'
import { EChartOption } from 'echarts'

export interface ChartProps {
  option: EChartOption
  onUpdated?: () => void
  onCreated?: () => void
}

const Chart = ({ option, onCreated, onUpdated, ...props }: ChartProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<echarts.ECharts>(null)
  const id = useMemo(() => `chart_${Math.random().toFixed(3).replace('.', '_')}`, [])

  const updateOption = useCallback((option: EChartOption) => {
    const chart = ref.current

    if (!chart || !option) {
      return
    }
    chart.setOption(option, {
      notMerge: true,
    })
  }, [])

  const initChart = () => {
    if (!containerRef.current) {
      return
    }
    const chart = echarts.init(containerRef.current)

    // @ts-ignore
    ref.current = chart
    updateOption(option)

    return chart
  }

  useNativeEffect(() => {
    initChart()
  }, [])

  useEffect(() => {
    updateOption(option)
  }, [option, updateOption])

  return <div ref={containerRef} id={id} style={{ width: '100vw', height: '100vh' }} {...props} />
}

export default Chart
