import { FunctionComponent, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { Timeframe, useVaultHistoricalData } from "../../../utils/snapshot";

export type VaultChartProps = {
    chainID: number;
    address: string;
};

const VaultChart: FunctionComponent<VaultChartProps> = ({ chainID, address }) => {
    // Fetch data
    const data = useVaultHistoricalData(chainID, address);

    // Component states
    const [currentData, setCurrentData] = useState(data.twoWeekly);
    if (!currentData && data.twoWeekly) {
        setCurrentData(data.twoWeekly); // Set current data on load
    }
    const [supplyAPY, setSupplyAPY] = useState(0);
    const [borrowAPY, setBorrowAPY] = useState(0);
    // Set initial data for onMouseLeave event on the price chart
    if (supplyAPY === 0 && borrowAPY === 0 && currentData) {
        setSupplyAPY(currentData.latestSupplyAPY);
        setBorrowAPY(currentData.latestBorrowAPY);
    }
    console.debug("borrowAPY", borrowAPY);
    console.debug("currentData", currentData);
    const [currentTimeframe, setCurrentTimeframe] = useState(Timeframe.TwoWeekly);

    // UI states
    const showSkeleton = data.isLoading || data.error;
    const showRealData = !showSkeleton && currentData;

    // Styling for active timeframe selector
    const activeTimeframeClasses = "bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 rounded-full font-semibold text-gray-light-12 dark:text-gray-dark-12";

    return (
        <div>
            {/* Supply & Borrow APY */}
            <div className="flex flex-row space-x-4 px-4">
                <div className="flex flex-col space-y-2 w-[80px]">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Supply APY</p>
                    {showSkeleton && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                    {showRealData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-green-light-11 dark:text-green-dark-11">{supplyAPY.toFixed(3) + "%"}</p>}
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 ">Borrow APY</p>
                    {showSkeleton && <div className="h-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] animate-pulse"></div>}
                    {showRealData && <p className="font-ibm font-semibold text-sm leading-4 tracking-[-.02em] text-red-light-10 dark:text-red-dark-10">{borrowAPY.toFixed(3) + "%"}</p>}
                </div>
            </div>

            {/* Price chart */}
            <div className="w-full h-[192px] mt-8 z-0">
                {showSkeleton && <div className="h-[192px] bg-gray-light-3 dark:bg-gray-dark-3 animate-pulse mb-2"></div>}
                {showRealData && (
                    <ResponsiveContainer width="100%" height="100%" className="h-full">
                        <AreaChart
                            data={currentData.data}
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            onMouseLeave={() => {
                                setSupplyAPY(currentData.latestSupplyAPY);
                                setBorrowAPY(currentData.latestBorrowAPY);
                            }}
                        >
                            <defs>
                                <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(37, 208, 171)" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="rgba(37, 208, 171)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="borrowGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgb(205, 43, 49)" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="rgb(205, 43, 49)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                position={{ y: 0 }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const selectedData = payload[0].payload;
                                        const timestamp = selectedData.timestamp;
                                        const date = new Date(timestamp);
                                        const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "numeric", year: "numeric", minute: "numeric" }).format(date);

                                        setSupplyAPY(selectedData.supply_apy);
                                        setBorrowAPY(selectedData.borrow_apy);

                                        return <div className="text-xs text-gray-light-10 dark:text-gray-dark-10">{formattedDate}</div>;
                                    }
                                    return null;
                                }}
                            />
                            <YAxis hide={true} type="number" domain={["dataMin - 5", "dataMax + 5"]} />
                            <Area type="monotoneX" dataKey="supply_apy" stroke="#4CC38A" fill="url(#supplyGradient)" strokeWidth={2} />
                            <Area type="monotoneX" dataKey="borrow_apy" stroke="#CD2B31" fill="url(#borrowGradient)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Timeframe selector */}
            <div className="flex flex-row items-center px-4 mt-2">
                <div className="basis-1/5 text-center">
                    <button
                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Daily ? activeTimeframeClasses : ""}`}
                        onClick={() => {
                            setCurrentTimeframe(Timeframe.Daily);
                            if (data.daily) {
                                setCurrentData(data.daily);
                                setSupplyAPY(data.daily.latestSupplyAPY);
                                setBorrowAPY(data.daily.latestBorrowAPY);
                            }
                        }}
                    >
                        1D
                    </button>
                </div>
                <div className="basis-1/5 text-center">
                    <button
                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Weekly ? activeTimeframeClasses : ""}`}
                        onClick={() => {
                            setCurrentTimeframe(Timeframe.Weekly);
                            if (data.weekly) {
                                setCurrentData(data.weekly);
                                setSupplyAPY(data.weekly.latestSupplyAPY);
                                setBorrowAPY(data.weekly.latestBorrowAPY);
                            }
                        }}
                    >
                        1W
                    </button>
                </div>
                <div className="basis-1/5 text-center">
                    <button
                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.TwoWeekly ? activeTimeframeClasses : ""}`}
                        onClick={() => {
                            setCurrentTimeframe(Timeframe.TwoWeekly);
                            if (data.twoWeekly) {
                                setCurrentData(data.twoWeekly);
                                setSupplyAPY(data.twoWeekly.latestSupplyAPY);
                                setBorrowAPY(data.twoWeekly.latestBorrowAPY);
                            }
                        }}
                    >
                        2W
                    </button>
                </div>
                <div className="basis-1/5 text-center">
                    <button
                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.Monthly ? activeTimeframeClasses : ""}`}
                        onClick={() => {
                            setCurrentTimeframe(Timeframe.Monthly);
                            if (data.monthly) {
                                setCurrentData(data.monthly);
                                setSupplyAPY(data.monthly.latestSupplyAPY);
                                setBorrowAPY(data.monthly.latestBorrowAPY);
                            }
                        }}
                    >
                        1M
                    </button>
                </div>
                <div className="basis-1/5 text-center">
                    <button
                        className={`text-xs leading-4 py-[7px] px-4 text-gray-light-11 dark:text-gray-dark-11 ${currentTimeframe === Timeframe.ThreeMonthly ? activeTimeframeClasses : ""}`}
                        onClick={() => {
                            setCurrentTimeframe(Timeframe.ThreeMonthly);
                            if (data.threeMonthly) {
                                setCurrentData(data.threeMonthly);
                                setSupplyAPY(data.threeMonthly.latestSupplyAPY);
                                setBorrowAPY(data.threeMonthly.latestBorrowAPY);
                            }
                        }}
                    >
                        3M
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VaultChart;
