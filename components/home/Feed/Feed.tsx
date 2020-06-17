import * as React from "react";
import css from "./Feed.module.scss";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_TOOLS, GET_FEED, GET_PROFILE, GET_COMMENT } from "core/queries";
import { useModal, getTimeAgo } from "core/tools";
import { Icon } from "core/elements";
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
  const [profileUrl, setProfileUrl] = React.useState("");
  const modal = useModal();

  if (event.type === "comment") {
    React.useEffect(() => {
      getComment();
    }, []);
  }

  const eventTools: TTool[] = React.useMemo(() => {
    if (event && dataTools) {
      return event.toolIds.map((toolId: TTool["id"]) => (dataTools.tools as TTool[]).find((i) => i.id === toolId));
    } else {
      return [];
    }
  }, [event, dataTools]);

  React.useEffect(() => {
    if (dataProfile) {
      const { profile } = dataProfile;

      if (profile.twitterId) {
        setProfileUrl("https://twitter.com/i/user/" + profile.twitterId);
      } else {
        const setGithubProfileUrl = async () => {
          const githubUser = await (await fetch("https://api.github.com/user/" + profile.githubId)).json();

          setProfileUrl(githubUser.html_url);
        };

        setGithubProfileUrl();
      }
    }
  }, [dataProfile]);

  const onClickTool = (tool: TTool) => modal(ToolDetails, { autoclose: true, payload: { tool } });

  return (
    <div className={css.listItem} style={{ animationDelay: index * 0.02 + "s" }}>
      <div className={css.listItemHeader}>
        <a className={css.photo} href={profileUrl} target="_blank" rel="noreferrer">
          {dataProfile?.profile.avatarUrl ? <img src={dataProfile.profile.avatarUrl} alt={dataProfile.profile.name} draggable="false" /> : <Icon name="user" />}
        </a>

        <div className={css.event}>
          <span className={css.link}>
            <a href={profileUrl} target="_blank" rel="noreferrer">
              {dataProfile?.profile.name}
            </a>
          </span>

          {event.type === "add" ? <span> added </span> : null}
          {event.type === "star" ? <span> starred </span> : null}
          {event.type === "comment" ? <span> commented on </span> : null}

          {eventTools.map((tool, index) => (
            <React.Fragment key={tool.id}>
              <span className={css.link} onClick={() => onClickTool(tool)}>
                {tool.label}
              </span>

              {index + 1 === eventTools.length - 1 ? <span> and </span> : index + 1 !== eventTools.length ? <span>, </span> : <span>.</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {event.type === "comment" ? (
        <div className={css.listItemBody}>
          <div className={css.text}>"{dataComment?.comment.text}"</div>

          <div className={css.cover}>
            {eventTools.length !== 0 ? (
              <ToolCard iconUrl={eventTools[0].iconUrl} coverUrl={eventTools[0].coverUrl} className={css.cover} onClick={() => onClickTool(eventTools[0])} />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={css.listItemTime}>{getTimeAgo(event.createdAt)}</div>
    </div>
  );
};

const Feed: React.FC = () => {
  const { data: dataFeed } = useQuery(GET_FEED, { fetchPolicy: "cache-and-network" });

  if (dataFeed) {
    return (
      <>
        <div className={css.pageTitle}>Latest Activities</div>

        <div className={css.list}>
          {dataFeed.feed.map((event: any, index: number) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Feed;
