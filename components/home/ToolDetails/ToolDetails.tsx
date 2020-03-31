import * as React from "react";
import { Button, Icon, Loading } from "core/elements";
import { TModalComponent, TTool } from "core/types";
import useIsToolAdded from "../utils/useIsToolAdded";
import css from "./ToolDetails.module.scss";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { IS_STARRED, GET_TOOLS } from "core/queries";
import { GIVE_STAR } from "core/mutations";

const ToolDetails: TModalComponent = ({ isAnimationDone, isClosing, payload }) => {
  const tool: TTool = payload?.tool;
  const callback: Function = payload?.callback;
  const { isAdded, onClickAdd, loading } = useIsToolAdded(tool.id, callback);
  const { data: dataIsStarred, loading: loadingIsStarred } = useQuery(IS_STARRED, { variables: { toolId: tool.id }, fetchPolicy: "network-only" });
  const [giveStar, { data: dataGiveStar, loading: loadingGiveStar }] = useMutation(GIVE_STAR, {
    variables: { toolId: tool.id },
    update: (cache) => {
      let newTools = (cache.readQuery({ query: GET_TOOLS }) as any).tools as [TTool];
      const toolIndex = newTools.findIndex((i) => i.id === tool.id);

      newTools[toolIndex].stars = tool.stars + 1;

      cache.writeQuery({ query: GET_TOOLS, data: { newTools } });
    }
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        <img src={"https://" + (tool.coverUrl || tool.iconUrl)} className={css.cover} draggable="false" />
        <div className={css.shade} />

        <div className={css.info}>
          <div className={css.label}>{tool.label}</div>

          <div className={css.numberContainer}>
            <div className={css.number}>
              <Icon name="star" className={css.icon} />

              <span>{tool.stars}</span>
            </div>

            <div className={css.number}>
              <Icon name="user" className={css.icon} />

              <span>{tool.users}</span>
            </div>
          </div>
        </div>

        <div className={css.actions}>
          <Button
            label={isAdded ? "ADDED" : "ADD TO DECK"}
            className={css.buttonAdd}
            onClick={() => {
              onClickAdd();
            }}
            loading={loading}
            disabled={isAdded}
          />

          <Button
            label=""
            icon={{ name: "star", position: "left", className: css.icon }}
            className={css.buttonStar}
            onClick={() => giveStar()}
            loading={loadingIsStarred || loadingGiveStar}
            disabled={dataIsStarred?.isStarred || dataGiveStar}
          />
        </div>
      </div>

      <div className={css.content}>
        <div className={css.section}>
          <div className={css.title}>Descripcion</div>

          <span>{tool.desc || tool.shortDesc}</span>
        </div>

        <div className={css.section}>
          <div className={css.title}>Preview</div>

          {!tool.external ? (
            isAnimationDone && !isClosing ? (
              <div className={css.previewContainer}>
                <div className={css.loadingContainer}>
                  <Loading className={css.loading} />
                </div>

                <iframe src={"https://" + tool.url} scrolling="no" draggable="false" />
              </div>
            ) : null
          ) : (
            <span>Preview not available.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolDetails;
