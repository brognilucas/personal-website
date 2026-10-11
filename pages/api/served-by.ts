import type { NextApiRequest, NextApiResponse } from "next";

// Module scope survives between invocations of a warm function instance,
// so the first request after a cold start sees isColdStart === true.
const instanceStartedAt = Date.now();
let isColdStart = true;

export type ServedBy = {
  region: string;
  coldStart: boolean;
  instanceAgeSeconds: number;
  runtime: string;
};

export default function handler(_req: NextApiRequest, res: NextApiResponse<ServedBy>) {
  const coldStart = isColdStart;
  isColdStart = false;

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    region: process.env.VERCEL_REGION || process.env.AWS_REGION || "local",
    coldStart,
    instanceAgeSeconds: Math.round((Date.now() - instanceStartedAt) / 1000),
    runtime: `Node.js ${process.versions.node}`,
  });
}
