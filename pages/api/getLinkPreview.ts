// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getLinkPreview } from "link-preview-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  url: string;
  title?: string;
  description?: string;
  images?: string[];
  favicons?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { link } = req.query;
  const linkPreview = await getLinkPreview(link as string);

  res.status(200).json(linkPreview);
}
