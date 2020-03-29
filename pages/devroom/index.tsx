import * as React from "react";
import { TPage } from "core/types";
import { Nest } from "core/elements";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TOOL } from "core/mutations";

const AdminIndexPage: TPage = () => {
  const [label, setLabel] = React.useState("");
  const [shortDesc, setShortDesc] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [tags, setTags] = React.useState([""]);
  const [url, setUrl] = React.useState("");
  const [iconUrl, setIconUrl] = React.useState("");
  const [coverUrl, setCoverUrl] = React.useState("");
  const [external, setExternal] = React.useState(false);
  const [createTool] = useMutation(CREATE_TOOL);

  return (
    <Nest>
      <div style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 60 }}>Welcome Master 🧛‍♀️</div>

      <div style={{ fontSize: "1.6rem" }}>
        <div style={{ marginBottom: 20 }}>
          <span>label: </span>
          <input value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span>shortDesc: </span>
          <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span>desc: </span>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span>cat: </span>
          <input value={cat} onChange={(e) => setCat(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span>tags: </span>
          <input value={tags.join(",")} onChange={(e) => setTags(e.target.value.replace(" ", "").split(","))} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span>url: </span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span>iconUrl: </span>
          <input value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span>coverUrl: </span>
          <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
        </div>

        <div style={{ marginBottom: 60 }}>
          <span>external: </span>
          <input type="checkbox" onChange={(e) => setExternal(e.target.checked)} />
        </div>

        <button
          onClick={() =>
            createTool({
              variables: {
                label,
                shortDesc,
                desc: desc.length > 0 ? desc.length : undefined,
                cat,
                tags,
                url,
                iconUrl,
                coverUrl: coverUrl.length > 0 ? coverUrl : undefined,
                external
              }
            })
          }
        >
          Create Tool
        </button>
      </div>
    </Nest>
  );
};

export default AdminIndexPage;
