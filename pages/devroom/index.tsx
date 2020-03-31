import * as React from "react";
import { TPage } from "core/types";
import { Nest, Button } from "core/elements";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_TOOL } from "core/mutations";
import { GET_USER } from "core/queries";
import { useRouter } from "next/router";
import { useDialog } from "core/tools";

const AdminIndexPage: TPage = () => {
  const { data } = useQuery(GET_USER);
  const [createTool, { loading }] = useMutation(CREATE_TOOL);
  const [label, setLabel] = React.useState("");
  const [shortDesc, setShortDesc] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [subCat, setSubCat] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [iconUrl, setIconUrl] = React.useState("");
  const [coverUrl, setCoverUrl] = React.useState("");
  const [external, setExternal] = React.useState(false);
  const router = useRouter();
  const dialog = useDialog();

  React.useEffect(() => {
    if (data && data.user.role !== "admin") {
      router.replace("/deck");
    }
  }, [data]);

  const onClickCreateTool = () =>
    createTool({
      variables: {
        label,
        shortDesc,
        desc: desc.replace(" ", "").length > 0 ? desc : undefined,
        cat,
        subCat,
        url,
        iconUrl,
        coverUrl: coverUrl.replace(" ", "").length > 0 ? coverUrl : undefined,
        external
      }
    })
      .then((response) => {
        dialog(response.data.createTool, { label: "Ok" });
      })
      .catch((error) => dialog(error.message, { label: "Ok" }));

  if (data) {
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
            <span>subCat: </span>
            <input value={subCat} onChange={(e) => setSubCat(e.target.value)} />
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

          <Button label="Create Tool" loading={loading} onClick={() => onClickCreateTool()} />
        </div>
      </Nest>
    );
  } else {
    return null;
  }
};

export default AdminIndexPage;
