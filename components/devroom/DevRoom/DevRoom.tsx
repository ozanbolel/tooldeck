import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "core/queries";
import { useRouter } from "next/router";
import { Nest } from "core/elements";
import css from "./DevRoom.module.scss";
import ToolList from "../ToolList/ToolList";

const DevRoom: React.FC = () => {
  const { data } = useQuery(GET_USER);
  const router = useRouter();

  React.useEffect(() => {
    if (data && data.user.role !== "admin") {
      router.replace("/deck");
    }
  }, [data]);

  if (data) {
    return (
      <Nest>
        <div className={css.devroom}>
          <div className={css.welcome}>
            <span className={css.highlight}>Welcome Master</span> 🧛‍♀️
          </div>

          <div className={css.page}>
            <ToolList />
          </div>
        </div>
      </Nest>
    );
  } else {
    return null;
  }
};

export default DevRoom;
