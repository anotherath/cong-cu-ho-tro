import { environment } from "../environment";
import type { IGoldPrice } from "../interface";

type MessageCallback = (data: IGoldPrice) => void;
type StatusCallback = (
  status: "connecting" | "connected" | "disconnected" | "error"
) => void;

class GoldSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimeout: number | null = null;
  private onMessageCallback: MessageCallback | null = null;
  private onStatusChange: StatusCallback | null = null;

  /** Kết nối WSS */
  connect() {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return; // tránh tạo kết nối trùng
    }

    console.log("🔌 Connecting to:", environment.WS_URL);
    this.updateStatus("connecting");

    try {
      this.ws = new WebSocket(environment.WS_URL);
    } catch (err) {
      console.error("❌ Lỗi khi tạo WebSocket:", err);
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      console.log("✅ WebSocket connected");
      this.updateStatus("connected");
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && typeof data === "object" && this.onMessageCallback) {
          this.onMessageCallback(data as IGoldPrice);
        }
      } catch (err) {
        console.error("❌ Lỗi parse JSON:", err);
      }
    };

    this.ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      this.updateStatus("error");
      this.scheduleReconnect();
    };

    this.ws.onclose = (event) => {
      console.warn(`⚠️ WebSocket disconnected (code=${event.code})`);
      this.updateStatus("disconnected");
      this.scheduleReconnect();
    };
  }

  /** Gọi lại khi có dữ liệu mới */
  onMessage(callback: MessageCallback) {
    this.onMessageCallback = callback;
  }

  /** Gọi lại khi trạng thái thay đổi */
  onStatus(callback: StatusCallback) {
    this.onStatusChange = callback;
  }

  /** Ngắt kết nối */
  disconnect() {
    console.log("🔌 Closing WebSocket...");
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.ws?.close();
    this.ws = null;
  }

  /** Gửi message (nếu cần) */
  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("⚠️ Cannot send: WebSocket not connected.");
    }
  }

  /** Luôn thử reconnect sau 5s nếu mất kết nối */
  private scheduleReconnect() {
    const delay = 2000; // cố định 5 giây
    console.log(`🔁 Reconnecting in ${delay / 1000}s...`);

    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = setTimeout(() => this.connect(), delay);
  }

  private updateStatus(
    status: "connecting" | "connected" | "disconnected" | "error"
  ) {
    if (this.onStatusChange) this.onStatusChange(status);
  }
}

export const goldSocketService = new GoldSocketService();
