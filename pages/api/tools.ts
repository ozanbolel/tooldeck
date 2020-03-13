import { NextApiRequest, NextApiResponse } from "next";
import { TTool } from "core/types";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const tools: Array<TTool> = [
    {
      id: "coolors",
      label: "Coolors",
      cat: "design",
      sub_cat: "colors",
      external: false,
      url: "coolors.co/browser/latest/1"
    },
    {
      id: "ihateregex",
      label: "iHateRegex",
      cat: "dev",
      sub_cat: "regex",
      external: false,
      url: "ihateregex.io"
    }
  ];

  res.status(200).json(tools);
};
