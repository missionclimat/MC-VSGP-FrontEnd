import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const compoChart = ({ datas, isXAxis, isYAxis }) => {
  
  const data = datas.data.data;

  const reversedDatas = [...datas.graphDatas.reverse()]
  datas.graphDatas.reverse()

  function handleTooltipTitle(payload, unit) {
    var annualEmi = 0;
    payload.forEach((data) => {
      if (data.name!=="Objectif") {(annualEmi += data.value)}
    });
    return payload[0] ? `Année : ${payload[0].payload.name} / Emissions annuelles : ${Math.round(annualEmi)} ${unit}` : ""
  }

  function toolTipContent({ payload, label }) {
    return (
      <div
        id="area-tooltip"
        className="chart-tooltip flex-item flex-column"
        style={{ backgroundColor: "white", width: "200px" }}
      >
        <h4 style={{ color: "#163e59" }}>{handleTooltipTitle(payload,datas.data.yTitle)}</h4>
        {payload.reverse().map((area, i) => (
          <div key={i} className="flex-item">
            <div
              key={"l" + i}
              className="legend-point"
              style={{ backgroundColor: area.color }}
            ></div>
            <p key={"t" + i} style={{ color: "#163E59" }}>
              {area.name} : {Math.round(area.value)} {datas.data.yTitle}
            </p>
          </div>
        ))}
      </div>
    );
  }

  function handleGraphType(data) {
    const props = {
      key: data.dataKey,
      dataKey: data.dataKey,
      stroke: data.color,
    };

    if (data.type === "Area") {
      const fillOpacity = data.color === "#FFFFFF" ? "0" : "1";
      return <Area fillOpacity={fillOpacity} fill={data.color} {...props} stackId="1" />;
    }
    if (data.type === "Line") return <Line {...props} strokeDasharray="5 5" dot={false} strokeWidth="4"/>;
  }

  return (
    <ResponsiveContainer height="100%" width="100%">
      <ComposedChart
        data={data}
        stackOffsetDiverging
        margin={{
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
        {isXAxis && <XAxis dataKey="name" stroke="white" interval="preserveStartEnd"/>}
        {isYAxis && <YAxis stroke="white" />}
        <Tooltip content={toolTipContent} position={{ x: 200, y: -50 }}/>
        {reversedDatas.map((data) => handleGraphType(data))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default compoChart;

