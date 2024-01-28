import { useState } from "react";
import "./App.css";
import QRCode from "qrcode";
import hotSpotSVG from "./assets/hotspot.svg";

function App() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const wifiName = formData.get("wifi_name");
    const wifiPassword = formData.get("wifi_password");
    const wifiSecurity = formData.get("wifi_security");
    const wifiString = `WIFI:T:${wifiSecurity};S:${wifiName};P:${wifiPassword};;`;
    const qrCode = await QRCode.toDataURL(wifiString, {
      margin: 0,
      width: 200,
      color: {
        dark: "#333333",
        light: "#ffffff",
      },
    });
    setQrCode(qrCode);
  };
  if (qrCode) {
    return (
      <div className="qrcodeCard">
        <img className="qrcodeCard__icon" src={hotSpotSVG} />
        <h1 className="qrcodeCard__title">Scan to connect</h1>
        <img className="qrcodeCard__qrcode" src={qrCode} />
      </div>
    );
  }
  return (
    <div className="form">
      <h1>Wifi QR code generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Wifi name
          <input type="text" name="wifi_name" />
        </label>
        <label>
          Wifi password
          <input type="text" name="wifi_password" />
        </label>
        <label>
          Wifi security
          <select name="wifi_security">
            <option value="WPA">WPA</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No password</option>
          </select>
        </label>
        <button>Generate QR code</button>
      </form>
    </div>
  );
}

export default App;
