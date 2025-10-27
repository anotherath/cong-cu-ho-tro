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
    BTMC_24K: "Bảo Tín Minh Châu",
    Doji_24K: "Doji",
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
    <div className="relative h-full  border-[#AF2828] border-t border-x shadow-md rounded-md overflow-hidden">
      <table className="absolute inset-0 w-full h-full border-collapse table-fixed text-2xl">
        <colgroup>
          <col className="w-[25%]" />
          <col className="w-[17%]" />
          <col className="w-[17%]" />
        </colgroup>

        <thead className="bg-[#AF2828] text-white text-[28px] uppercase">
          <tr>
            <th className="py-2 border-white border-r font-semibold text-center">
              Thương hiệu
            </th>
            <th className="py-2 border-white border-r text-center font-semibold">
              Giá mua{" "}
              <p className="text-[16px] italic font-light normal-case">
                (Triệu đồng/lượng)
              </p>
            </th>
            <th className="py-2 text-center font-semibold">
              Giá bán{" "}
              <p className="text-[16px] italic font-light normal-case">
                (Triệu đồng/lượng)
              </p>
            </th>
          </tr>
        </thead>

        <tbody className="text-[28px] bg-white/60">
          {goldData?.length ? (
            goldData.slice(0, 6).map((gold, i) => {
              const price = gold.hanoi;

              return (
                <tr
                  key={i}
                  className="hover:bg-[#FFF7D1] transition-colors duration-200"
                >
                  <td
                    className={`px-2 ${
                      ["Doji_24K", "BTMC_24K"].includes(gold.name)
                        ? "py-0"
                        : "py-2"
                    } border-[#AF2828] uppercase border-r border-b text-[#AF2828] font-bold text-center`}
                  >
                    {getDisplayName(gold.name)}
                    {["Doji_24K", "BTMC_24K"].includes(gold.name) && (
                      <p className="text-[15px] leading-1 italic font-light normal-case">
                        (Nhẫn tròn 9999)
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-2 border-[#AF2828] border-r border-b font-bold text-center">
                    {formatNumber(price.buy)}
                  </td>

                  <td className="px-6 py-2 border-[#AF2828] border-b font-bold text-center">
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

        <thead className="bg-[#AF2828] text-white text-[28px] uppercase">
          <tr>
            <th className="py-2 border-white border-r font-semibold text-center">
              Giá bạc
            </th>
            <th className="py-2 border-white border-r text-center font-semibold">
              Giá mua{" "}
              <p className="text-[16px] italic font-light normal-case">
                (Triệu đồng/lượng)
              </p>
            </th>
            <th className="py-2 text-center font-semibold">
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
                <td className="px-6 py-2 border-[#AF2828] uppercase border-r border-b text-[#AF2828] font-bold text-center">
                  {getDisplayName(gold.name)}
                </td>
                <td className="px-6 py-2 border-[#AF2828] border-r border-b font-bold text-center">
                  {formatNumber(price.buy)}
                </td>
                <td className="px-6 py-2 border-[#AF2828] border-b font-bold text-center">
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
