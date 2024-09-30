import { LineChart001 } from "@/components/line-chart-001";
import { BarChartVictims } from "@/components/Bar-char-001";
import { PieChart } from "@/components/Pie-chart-001";
import { BarChartVictims2 } from "@/components/Bar-char-002";
import { LineChart002 } from "@/components/line-chart-002";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <LineChart001 />
      </div>
      <br></br>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <BarChartVictims />
      </div>
      <br></br>
      <div className="z-10 max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
        <PieChart />
      </div>
      <br></br>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <BarChartVictims2 />
      </div>
      <br></br>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <LineChart002 />
      </div>
    </main>
  );
}
