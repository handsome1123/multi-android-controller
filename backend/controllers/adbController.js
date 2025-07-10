const { exec } = require('child_process');

exports.getDevices = (req, res) => {
  exec('adb devices', (err, stdout) => {
    if (err) return res.status(500).json({ error: err.message });

    const devices = stdout
      .split('\n')
      .slice(1)
      .filter(line => line.includes('device') && !line.includes('offline'))
      .map(line => line.split('\t')[0]);

    res.json({ devices });
  });
};

exports.sendCommand = (req, res) => {
  const deviceId = req.params.id;
  const { command } = req.body;

  exec(`adb -s ${deviceId} shell "${command}"`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ output: stdout });
  });
};
