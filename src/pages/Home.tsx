import { useRef, useEffect, useState } from "react";
import { toBlob } from "html-to-image";
import { PriceBoard } from "../components/PriceBoard";
import type { IGoldPrice, SjcNationWide } from "../interface";
import { goldSocketService } from "../services/goldSocket.service";
import watermark from "../assets/watermark.png";

function Home() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [goldData, setGoldData] = useState<SjcNationWide[] | null>(null);

  // ✅ Tooltip (hiển thị ở góc phải dưới)
  const [tooltip, setTooltip] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const showTooltip = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setTooltip({ message, type });
    setTimeout(() => setTooltip({ message: "", type: null }), 2500); // tự ẩn sau 2.5s
  };

  const handleCopyImage = async (action: "copy" | "download" = "copy") => {
    if (!goldData || goldData.length === 0) {
      showTooltip("⚠️ Chưa có dữ liệu để xuất ảnh!", "error");
      return;
    }

    if (!captureRef.current) return;

    try {
      const node = captureRef.current;
      const rect = node.getBoundingClientRect();

      // Scale ảnh lên 2000px
      const scale = 2000 / Math.max(rect.width, rect.height);

      const blob = await toBlob(node, {
        backgroundColor: "#ffffff",
        pixelRatio: 1,
        width: rect.width * scale,
        height: rect.height * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        },
      });

      if (!blob) {
        showTooltip("❌ Không thể tạo ảnh!", "error");
        return;
      }

      // Format tên file
      const formatDateTime = (dateString: string) => {
        const d = new Date(dateString);
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${pad(d.getDate())}-${pad(
          d.getMonth() + 1
        )}-${d.getFullYear()}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(
          d.getSeconds()
        )}`;
      };

      const updateTime = goldData[0]?.update_at
        ? formatDateTime(goldData[0].update_at)
        : "unknown-time";

      const fileName = `bảng giá vàng bạc - ${updateTime}.png`;

      if (action === "copy") {
        // ✅ Copy ảnh (chỉ hỗ trợ trình duyệt mới: Chrome >= 99)
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          showTooltip("✅ Ảnh 2000×2000 đã copy vào clipboard!");
        } else {
          // Fallback: download tạm nếu không copy được
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          showTooltip("⚠️ Trình duyệt không hỗ trợ copy, hãy tải tạm ảnh!");
          return;
        }
      } else if (action === "download") {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showTooltip(`✅ Ảnh "${fileName}" đã được tải về!`);
      }
    } catch (err) {
      console.error(err);
      showTooltip("⚠️ Có lỗi khi xử lý ảnh!", "error");
    }
  };

  const handleGoldData = (data: IGoldPrice) => {
    console.log("📨 Nhận dữ liệu thô từ WebSocket:", data);
    const ALLOWED_NAMES = [
      "SJC TD",
      "SJC",
      "BTMC_24K",
      "Doji_24K",
      "99,99% GF",
      "95% GF",
      "GOLDENFUND_1L",
      "PHUQUY_1L",
      "ANCARAT_1L",
    ];

    const mergedData = [
      ...(data.sjcNationWide || []),
      ...(data.goldNationWide || []),
      ...(data.silver_price || []),
    ];

    const filteredData = mergedData.filter((item) =>
      ALLOWED_NAMES.includes(item.name)
    );

    const sortedData = filteredData.sort(
      (a, b) => ALLOWED_NAMES.indexOf(a.name) - ALLOWED_NAMES.indexOf(b.name)
    );

    setGoldData(sortedData);
  };

  function formatDateTime(isoString: string): string {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    goldSocketService.onMessage((data) => handleGoldData(data));
    goldSocketService.connect();
    return () => {
      goldSocketService.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto  h-screen flex flex-col items-center justify-center relative">
      {/* Nút copy ảnh + Tooltip nằm chung khung */}
      <div className="relative flex flex-col md:flex-row gap-4 p-1">
        <button
          onClick={() => handleCopyImage("copy")}
          className="px-5 py-2 bg-green-600 text-white font-medium  rounded-lg hover:bg-green-700 transition hover:cursor-pointer"
        >
          📋 Copy ảnh vào clipboard
        </button>
        <button
          onClick={() => handleCopyImage("download")}
          className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition hover:cursor-pointer"
        >
          📋 Lưu ảnh vào máy
        </button>

        {/* ✅ Tooltip nằm ngay dưới nút */}
        {tooltip.type && (
          <div
            className={`absolute top-full w-[320px] left-1/2 -translate-x-1/2 mt-2 px-4 py-2 rounded-lg shadow-lg text-white font-medium text-sm transition-all duration-300 transform ${
              tooltip.type === "success"
                ? "bg-green-600 animate-slide-up"
                : "bg-red-600 animate-slide-up"
            }`}
          >
            {tooltip.message}
          </div>
        )}
      </div>
      {/* Vùng capture */}
      <div
        ref={captureRef}
        className="flex flex-col gap-4 px-12 py-12 aspect-square h-[960px] bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(${watermark})`,
        }}
      >
        <p className="font-bold text-[64px] w-fit px-6  rounded-xl mx-auto text-center leading-8  text-[#AF2828]">
          BẢNG GIÁ VÀNG & BẠC
        </p>

        <p className="text-center text-[26px]">
          {goldData
            ? `Cập nhật vào ${formatDateTime(goldData[0].update_at)}`
            : `Đang cập nhật`}
        </p>
        <PriceBoard goldData={goldData} />
        <p className="text-center font-medium italic text-[20px]">
          *Bảng giá mang tính chất tham khảo, xem bảng giá đầy đủ tại
          vang247.com
        </p>
      </div>
    </div>
  );
}

export default Home;
