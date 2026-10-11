import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export const getServiceLogs = async (req, res, next) => {
  try {
    const { service } = req.params;
    const command = `journalctl -u ${service} --no-pager -n 200 --since "1 hour ago"`;

    const { stdout } = await execAsync(command);
    res.json({
      service,
      logs: stdout
    });
  } catch (error) {
    next(error);
  }
};

export const getSystemStats = async (req, res, next) => {
  try {
    const { stdout } = await execAsync("systemctl --type=service --state=active --no-pager");
    res.json({
      services: stdout
    });
  } catch (error) {
    next(error);
  }
};
