export default {
  obtainLabelsRequired(success, err) {
    const process = require("child_process").exec;
    const processPath = "java -jar interface.jar";
    var parameters = ["-a"];

    process(processPath, {
      maxBuffer: 1024 * 30000
    }, function (err, data) {
      const json = data.split("{{[[]]}}");
      success(JSON.parse(json[1]));
    });
  }
};