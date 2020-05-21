import * as React from "react";
import css from "./Feed.module.scss";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_TOOLS, GET_FEED, GET_PROFILE, GET_COMMENT } from "core/queries";
import { useModal, getTimeAgo } from "core/tools";
import { TTool } from "core/types";
import ToolDetails from "../ToolDetails/ToolDetails";
import ToolCard from "../ToolCard/ToolCard";

type TEventCard = React.FC<{
  event: any;
  index: number;
}>;

const EventCard: TEventCard = ({ event, index }) => {
  const { data: dataTools } = useQuery(GET_TOOLS);
  const { data: dataProfile } = useQuery(GET_PROFILE, { variables: { userId: event.userId } });
  const [getComment, { data: dataComment }] = useLazyQuery(GET_COMMENT, { variables: { commentId: event.commentId } });
  const modal = useModal();

  if (event.type === "comment") {
    React.useEffect(() => {
      getComment();
    }, []);
  }

  if (dataTools && dataProfile) {
    const tool = (dataTools.tools as TTool[]).find((i) => i.id === event.toolId);

    if (tool) {
      const { profile } = dataProfile;

      const onClickProfile = async () => {
        let url;

        if (profile.twitterId) {
          url = "https://twitter.com/i/user/" + profile.twitterId;
        } else {
          const githubUser = await (await fetch("https://api.github.com/user/" + profile.githubId)).json();

          url = githubUser.html_url;
        }

        window.open(url, "_blank");
      };

      const onClickTool = () => modal(ToolDetails, { autoclose: true, payload: { tool } });

      return (
        <div className={css.listItem} style={{ animationDelay: index * 0.02 + "s" }}>
          <div className={css.listItemHeader}>
            <div className={css.photo} onClick={() => onClickProfile()}>
              <img src={profile.avatarUrl} alt={profile.name} draggable="false" />
            </div>

            <div className={css.event}>
              <div>
                <span className={css.link} onClick={() => onClickProfile()}>
                  {profile.name}
                </span>

                {event.type === "add" ? <span> added </span> : null}
                {event.type === "star" ? <span> starred </span> : null}
                {event.type === "comment" ? <span> commented on </span> : null}

                <span className={css.link} onClick={() => onClickTool()}>
                  {tool.label}
                </span>

                <span>.</span>
              </div>
            </div>
          </div>

          {event.type === "comment" && dataComment ? (
            <div className={css.listItemBody}>
              <div className={css.text}>{dataComment.comment.text}</div>

              <div className={css.cover}>
                <ToolCard iconUrl={tool.iconUrl} coverUrl={tool.coverUrl} className={css.cover} onClick={() => onClickTool()} />
              </div>
            </div>
          ) : null}

          <div className={css.listItemTime}>{getTimeAgo(event.createdAt)}</div>
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const Feed: React.FC = () => {
  const { data: dataFeed } = useQuery(GET_FEED, { fetchPolicy: "cache-and-network" });

  if (dataFeed) {
    return (
      <div className={css.list}>
        {dataFeed.feed.map((event: any, index: number) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default Feed;
