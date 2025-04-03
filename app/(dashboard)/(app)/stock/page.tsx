"use client";

import { useGetStocksQuery } from "@/redux/features/stock/stock.api";
import { useStore } from "@/store/useStore";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useGetProductsForSaleQuery } from "@/redux/features/product/product.api";

export default function StockPage() {
  const organizationId = useStore((state) => state.organizationId);
  const { data, isFetching, isError } = useGetStocksQuery(organizationId, {
    refetchOnMountOrArgChange: true,
  });
  const { data: productsData } = useGetProductsForSaleQuery({
    organization_id: organizationId,
  });
  const mainProductsData = productsData?.items;

  const newData = data?.map((data) => {
    const photos = mainProductsData?.find(
      (mainProductData) => mainProductData.id === data.product_id
    )?.photos;
    return {
      ...data,
      productPhotos: photos?.map((photo) => ({
        url: `https://api.timbu.cloud/images/${photo.url}`,
        position: photo.position,
        filename: photo.filename,
        model_id: photo.model_id,
      })),
    };
  });
  return (
    <div className="container mx-auto">
      <div className="container mx-auto pl-1 bg-[#F6F8FA] rounded-tr-[12px] rounded-br-[12px] border-l border-solid rounded-bl-[12px]">
        <DataTable
          data={newData ?? []}
          columns={columns}
          loading={isFetching}
          error={isError}
        />
      </div>
    </div>
  );
}
