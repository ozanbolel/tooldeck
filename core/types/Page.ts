import * as React from "react";
import { NextPage } from "next";

export type TPage = NextPage & { Layout?: React.FC };
