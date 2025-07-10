import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [devices, setDevices] = useState([]);
  const [command, setCommand] = useState('');

  // Fetch devices on component mount
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      // Update this URL once backend is ready
      const res = await axios.get('http://localhost:5000/api/devices');
      setDevices(res.data.devices);
    } catch (error) {
      alert('Failed to fetch devices: ' + error.message);
    }
  };

  const sendCommand = async (deviceId) => {
    if (!command.trim()) {
      alert('Please enter a command.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/devices/${deviceId}/command`,
        { command }
      );
      alert(`Output from device ${deviceId}:\n${res.data.output}`);
    } catch (error) {
      alert(
        `Failed to send command to device ${deviceId}:\n` +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Android Devices Controller</h1>

      <input
        type="text"
        placeholder="Enter ADB shell command e.g. input tap 100 200"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 16, fontSize: 16 }}
      />

      <button onClick={fetchDevices} style={{ padding: '8px 16px', marginBottom: 20 }}>
        Refresh Device List
      </button>

      <ul>
        {devices.length === 0 && <li>No devices connected.</li>}
        {devices.map((device) => (
          <li key={device} style={{ marginBottom: 12 }}>
            <b>{device}</b>{' '}
            <button onClick={() => sendCommand(device)} style={{ marginLeft: 10 }}>
              Send Command
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
