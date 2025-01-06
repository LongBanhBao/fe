import axios from "axios";
import Bottleneck from "bottleneck";

export const instancePiston = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getRuntime = async () => {
  try {
    const response = await instancePiston.get("/runtimes");
    return response.data;
  } catch (error) {
    console.log("Error in get runtime", error);
  }
};

const getRuntimeVersion = async () => {
  const response = await getRuntime();
  const runtimes = response.filter(
    (runtime: any) => runtime.language === "python"
  );
  return runtimes[0].version;
};

let version: string;
(async () => {
  version = await getRuntimeVersion();
  console.log(version);
})();

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 300,
});

export const runPythonCode = limiter.wrap(
  async (code: string, input: string) => {
    try {
      const response = await instancePiston.post("/execute", {
        language: "python",
        version: version,
        files: [
          {
            name: "main.py",
            content: code,
          },
        ],
        stdin: input,
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      });
      const output = response.data.run;
      console.log(output);
      return output;
    } catch (error) {
      console.log("Error in post piston", error);
    }
  }
);
