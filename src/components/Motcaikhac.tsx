import React from "react";
import type { SjcNationWide } from "../interface";

interface PriceBoardProps {
  goldData: SjcNationWide[] | null;
}

export const PriceBoard: React.FC<PriceBoardProps> = ({ goldData }) => {
  // ✅ Bảng đổi tên hiển thị
  const NAME_MAP: Record<string, string> = {
    "SJC TD": "SJC Tự Do",
    SJC: "Vàng Miếng SJC",
    BTMC: "Bảo Tín Minh Châu",
    Doji: "Doji",
    "99,99% GF": "99,99% GOLDEN FUND",
    "95% GF": "95% GOLDEN FUND",
    GOLDENFUND_1L: "GOLDEN FUND",
    PHUQUY_1L: "Phú Quý",
    ANCARAT_1L: "Ancarat",
  };

  // ✅ Định dạng số theo kiểu vàng/bạc (không có thập phân)
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // ✅ Lấy tên hiển thị, nếu không có thì giữ nguyên
  const getDisplayName = (name: string) => {
    return NAME_MAP[name] || name;
  };

  return (
    <div className="relative h-full  border-[#000000] border-t border-x shadow-md rounded-md overflow-hidden">
      <table className="absolute inset-0 w-full h-full border-collapse table-fixed text-2xl">
        <colgroup>
          <col className="w-[25%]" />
          <col className="w-[17%]" />
          <col className="w-[17%]" />
        </colgroup>

        <thead className="bg-[#FFE443] text-black text-[28px] uppercase">
          <tr>
            <th className="py-2 border-black border-r border-b font-bold text-center ">
              Giá vàng
            </th>
            <th className="py-2 border-black border-r border-b text-center font-bold">
              Giá mua{" "}
              <p className="text-[16px] italic font-light normal-case">
                (Triệu đồng/lượng)
              </p>
            </th>
            <th className="py-2 text-center border-b font-bold">
              Giá bán{" "}
              <p className="text-[16px] italic font-light normal-case">
                (Triệu đồng/lượng)
              </p>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white/60 text-[28px]">
          {goldData?.length ? (
            goldData.slice(0, 6).map((gold, i) => {
              const price = gold.hanoi;
              return (
                <tr
                  key={i}
                  className="hover:bg-[#FFF7D1] transition-colors duration-200"
                >
                  <td className="px-6 py-2 uppercase border-[#000000] border-r border-b text-[#000000] font-bold text-center">
                    {getDisplayName(gold.name)}
                  </td>
                  <td className="px-6 py-2 border-[#000000] border-r border-b font-bold text-center">
                    {formatNumber(price.buy)}
                  </td>
                  <td className="px-6 py-2 border-[#000000] border-b font-bold text-center">
                    {formatNumber(price.sell)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500 italic">
                Đang chờ dữ liệu...
              </td>
            </tr>
          )}
        </tbody>

        <thead className="bg-[#FFE443] text-black text-[28px] uppercase">
          <tr>
            <th className="py-2 border-black border-r border-b font-semibold text-center">
              Giá bạc
            </th>
            <th className="py-2 border-black border-r border-b text-center font-semibold">
              Giá mua{" "}
              <p className="text-[16px] italic font-light normal-case">
                (Triệu đồng/lượng)
              </p>
            </th>
            <th className="py-2 text-center border-b font-semibold">
              Giá bán{" "}
              <p className="text-[16px] italic font-light normal-case">
                (Triệu đồng/lượng)
              </p>
            </th>
          </tr>
        </thead>
        {/* --- 3 dòng còn lại --- */}
        <tbody className="text-[28px] bg-white/60">
          {goldData?.slice(6, 9).map((gold, i) => {
            const price = gold.hanoi;
            return (
              <tr
                key={`extra-${i}`}
                className="hover:bg-[#FFF7D1] transition-colors duration-200"
              >
                <td className="px-6 py-2 uppercase border-[#000000] border-r border-b text-[#000000] font-bold text-center">
                  {getDisplayName(gold.name)}
                </td>
                <td className="px-6 py-2 border-[#000000] border-r border-b font-bold text-center">
                  {formatNumber(price.buy)}
                </td>
                <td className="px-6 py-2 border-[#000000] border-b font-bold text-center">
                  {formatNumber(price.sell)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
