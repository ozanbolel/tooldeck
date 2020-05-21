import * as React from "react";
import { Button, Icon, Web } from "core/elements";
import { TModalComponent, TTool } from "core/types";
import useIsToolAdded from "../utils/useIsToolAdded";
import css from "./ToolDetails.module.scss";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { IS_STARRED, GET_TOOLS, GET_COMMENTS, GET_PROFILE, GET_USER } from "core/queries";
import { GIVE_STAR, ADD_COMMENT } from "core/mutations";
import { useDialog, getTimeAgo } from "core/tools";

const CommentCard: React.FC<{ comment: any }> = ({ comment }) => {
  const { data: dataProfile } = useQuery(GET_PROFILE, { variables: { userId: comment.userId } });

  if (dataProfile) {
    const { profile } = dataProfile;

    const onClickProfile = async () => {
      let url;

      if (profile.twitterId) {
        url = "https://twitter.com/i/user/" + profile.twitterId;
      } else {
        const githubUser = await (await fetch("https://api.github.com/user/" + "49209002")).json();

        url = githubUser.html_url;
      }

      window.open(url, "_blank");
    };

    return (
      <div key={comment} className={css.comment}>
        <div className={css.commentHeader}>
          <div className={css.photo} onClick={() => onClickProfile()}>
            <img src={profile.avatarUrl} alt={profile.name} draggable="false" />
          </div>

          <div className={css.name}>
            <span className={css.link} onClick={() => onClickProfile()}>
              {profile.name}
            </span>
            <span> says:</span>
          </div>
        </div>

        <div className={css.commentBody}>{comment.text}</div>

        <div className={css.commentTime}>{getTimeAgo(comment.createdAt)}</div>
      </div>
    );
  } else {
    return null;
  }
};

const ToolDetails: TModalComponent = ({ rerender, isAnimationDone, closeModal, isClosing, payload }) => {
  const tool: TTool = payload?.tool;
  const callback: Function = payload?.callback;
  const { isAdded, onClickAdd, loading } = useIsToolAdded(tool.id, callback);
  const { data: dataIsStarred, loading: loadingIsStarred } = useQuery(IS_STARRED, { variables: { toolId: tool.id }, fetchPolicy: "network-only" });
  const { data: dataComments } = useQuery(GET_COMMENTS, { variables: { toolId: tool.id }, fetchPolicy: "cache-and-network" });
  const [giveStar, { data: dataGiveStar, loading: loadingGiveStar }] = useMutation(GIVE_STAR, {
    variables: { toolId: tool.id },
    update: (cache) => {
      let newTools = (cache.readQuery({ query: GET_TOOLS }) as any).tools as [TTool];
      const toolIndex = newTools.findIndex((i) => i.id === tool.id);

      newTools[toolIndex].stars = tool.stars + 1;

      cache.writeQuery({ query: GET_TOOLS, data: { tools: newTools } });
    }
  });
  const [commentText, setCommentText] = React.useState("");
  const [addComment, { data: dataAddComment }] = useMutation(ADD_COMMENT, {
    variables: { toolId: tool.id, text: commentText },
    update: (cache) => {
      const userId = (cache.readQuery({ query: GET_USER }) as any).user.id;
      const currentComments = (cache.readQuery({ query: GET_COMMENTS, variables: { toolId: tool.id } }) as any).comments;

      const newComments = [
        { id: "comment-" + new Date().getTime(), userId, text: commentText, createdAt: new Date().toISOString(), __typename: "Comment" },
        ...currentComments
      ];

      cache.writeQuery({ query: GET_COMMENTS, variables: { toolId: tool.id }, data: { comments: newComments } });
    }
  });
  const dialog = useDialog();
  const refComments = React.useRef<any>();

  const goToComments = () => refComments.current.scrollIntoView();

  const onCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data, errors } = await addComment();

    if (!data && errors) {
      dialog("We couldn't add your comment.", { label: "Ok" });
    } else {
      goToComments();
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <img src={"https://" + (tool.coverUrl || tool.iconUrl)} className={css.cover} draggable="false" />
        <div className={css.shade} />

        <div className={css.info}>
          <div className={css.label}>{tool.label}</div>

          <div className={css.numberContainer}>
            <div className={css.number}>
              <Icon name="users" className={css.icon} />

              <span>{tool.users}</span>
            </div>

            <div className={css.number}>
              <Icon name="star" className={css.icon} />

              <span>{tool.stars}</span>
            </div>

            <div className={css.number}>
              <Icon name="message-circle" className={css.icon} />

              <span>{dataComments?.comments.length}</span>
            </div>
          </div>
        </div>

        <div className={css.actions}>
          <Button
            label={isAdded ? "ADDED" : "ADD TO DECK"}
            className={css.buttonAdd}
            onClick={async () => {
              await onClickAdd();

              rerender();
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
        <div className={css.seeComments}>
          <button onClick={() => goToComments()}>
            <span>SEE COMMENTS</span>
            <Icon name="chevron-down" />
          </button>
        </div>

        <div className={css.section}>
          <div className={css.title}>
            <span>Descripcion</span>
          </div>

          <span>{tool.desc || tool.shortDesc}</span>
        </div>

        <div className={css.section}>
          <div className={css.title}>
            <span>Preview</span>

            <button onClick={() => window.open("https://" + tool.url, "_blank")}>OPEN IN NEW TAB</button>
          </div>

          {!tool.external ? (
            isAnimationDone && !isClosing ? (
              <div className={css.previewContainer}>
                <Web url={tool.url} scrolling="no" />
              </div>
            ) : null
          ) : (
            <span>Preview not available. Please open in new tab.</span>
          )}
        </div>

        <div ref={refComments} className={css.section}>
          <div className={css.title}>
            <span>Comments ({dataComments ? dataComments.comments.length : 0})</span>
          </div>

          <div>
            {isAnimationDone && dataComments && dataComments.comments.length !== 0 ? (
              dataComments.comments.map((comment: any) => <CommentCard key={comment.id} comment={comment} />)
            ) : (
              <span>Be first to comment!</span>
            )}
          </div>
        </div>
      </div>

      <div className={css.leaveComment}>
        {!dataAddComment ? (
          <form onSubmit={(event) => onCommentSubmit(event)}>
            <input
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Leave a comment..."
              minLength={2}
              maxLength={480}
              required
            />

            <button type="submit">SEND</button>
          </form>
        ) : (
          <div className={css.success}>Your comment has been successfully submitted.</div>
        )}
      </div>

      <div className={css.mobileActions}>
        <Button
          label={isAdded ? "ADDED" : "ADD TO DECK"}
          className={css.mobileActionsButton + " " + css.add}
          onClick={async () => {
            await onClickAdd();

            rerender();
          }}
          loading={loading}
          disabled={isAdded}
        />

        <Button
          label=""
          icon={{ name: "star", position: "left", className: css.icon }}
          className={css.mobileActionsButton + " " + css.star}
          onClick={() => giveStar()}
          loading={loadingIsStarred || loadingGiveStar}
          disabled={dataIsStarred?.isStarred || dataGiveStar}
        />

        <Button label="CLOSE" className={css.mobileActionsButton + " " + css.close} onClick={() => closeModal()} />
      </div>
    </div>
  );
};

export default ToolDetails;
