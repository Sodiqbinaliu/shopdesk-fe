"use client";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  type Column,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { columns, type Sale } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DataTablePagination } from "./components/data-table-pagination";
import { processDataIntoGroups, sampleData } from "./data/data";

export default function SalesPage() {
  const [groupedData, setGroupedData] = useState<
    {
      date: string;
      time: string;
      timeKey: string;
      items: Sale[];
      total: Sale;
    }[]
  >([]);
  const [viewType, setViewType] = React.useState<"Daily" | "Weekly" | "Flat">(
    "Daily"
  );

  useEffect(() => {
    setGroupedData(processDataIntoGroups(sampleData));
  }, []);

  // Create a table instance for pagination
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log(table);

  return (
    <div className="w-full border rounded-tr-2xl border-[#E9EEF3]">
      <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr]">
        <div className="flex   border-b border-[#E9EEF3] p-5 items-center justify-start">
          ITEM NAME
        </div>
        <div className="flex border-x border-b border-[#E9EEF3] p-5 items-center justify-center">
          QUANTITY SOLD
        </div>
        <div className="flex  border-b border-[#E9EEF3] p-5 items-center justify-center">
          SELL PRICE
        </div>
        <div className="flex border-l border-b  border-[#E9EEF3] p-5 items-center justify-center">
          SHOW PROFIT
        </div>
      </div>

      <div className="flex  flex-col gap-6">
        {groupedData.map((data) => (
          <div>
            <div className="grid grid-cols-[1fr_0.69fr_0.69fr_0.69fr] pb-0 pl-[3px] p-5">
              <div className="grid grid-cols-[1fr_0.1fr] place-items-center pr-3 ">
                <div className="flex justify-evenly items-center bg-[#F6F8FA] border-x border-t  border-[#DEE5ED] rounded-t-[10px] p-3 gap-3">
                  <p className="text-[#2A2A2A] font-[500] text-xl">
                    {data.date}
                  </p>
                  <div className="bg-[#DEE5ED] h-[20px] w-[1.5px]" />
                  <p className="text-[#888888] font-[450] text-xl">
                    {data.time}
                  </p>
                </div>
                <h3 className="text-[#2A2A2A] font-[450] text-xl text-center px-3">
                  {data.total.itemName}
                </h3>
              </div>
              <div className="border-x border-y rounded-tl-2xl border-[#DEE5ED] bg-[#E5F5ED] p-[3px] flex items-center justify-center text-[#090F1C] font-[500] text-xl">
                {data.total.quantitySold}
              </div>
              <div className="border-r border-y border-[#DEE5ED] bg-[#E5F5ED] p-[3px] flex items-center justify-center text-[#090F1C] font-[500] text-xl">
                ₦{data.total.sellPrice}
              </div>
              <div className="border-r border-y rounded-tr-2xl border-[#DEE5ED] bg-[#E5F5ED] p-[3px] flex items-center justify-center text-[#090F1C] font-[500] text-xl">
                ₦{data.total.profit}
              </div>
            </div>
            {data.items.map((item, i) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_0.715fr_0.715fr_0.715fr] ml-2.5 pr-5 pl-2"
              >
                <div
                  className={`flex   border-b  ${
                    i === 0 && "border-t"
                  } border-l border-[#E9EEF3] p-5 items-center justify-start`}
                >
                  {item.itemName}
                </div>
                <div className="flex border-x border-b border-[#E9EEF3] p-5 items-center justify-center">
                  {item.quantitySold}
                </div>
                <div className="flex  border-b border-[#E9EEF3] p-5 items-center justify-center">
                ₦{item.sellPrice}
                </div>
                <div className="flex border-x border-b  border-[#E9EEF3] p-5 items-center justify-center">
                ₦{item.profit}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
