import { useRef, useState } from "react";
import { FaSync } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";
import { useUploaded } from "../hooks/uploadHook";
import Loader from "./Loader";
import "./scss/home.scss";
import { DownloadIcon } from "./SvgComponents";

const Home = () => {
  const { data, refetch, isPending } = useUploaded();
  const inputRef = useRef(null);
  const inputDesRef = useRef(null)
  const [sending, setSending] = useState([]);
  
  const sendFile = () => {
    if (!inputRef?.current.files || inputRef?.current.files?.length <= 0) return;
    else console.log(inputRef)
    try {
      for (let file of inputRef.current.files) {
        inputDesRef.current.textContent = "Drag & Drop files here"
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);
        xhr.open("POST", `/api/upload`);
        const uploadId = uuidV4();
        console.log(uploadId, "Iddd");
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = event.total
              ? (event.loaded / event.total) * 100
              : 0;
            setSending((state) =>
              state.map((value) =>
                value.id === uploadId ? { ...value, percent: percent } : value
              )
            );
            console.log(percent);
          }
        };
        xhr.onload = () => {
          setSending((state) => state.filter(({ id }) => id !== uploadId));
          refetch()
        };
        xhr.send(formData);
        setSending((state) => [
          ...state,
          { id: uploadId, name: file.name, size: file.size, percent: 0 },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const getCardById = (uploadId) => sending.find(({ id }) => id === uploadId);

  return (
    <>
    {console.log(inputRef, import.meta.env.VITE_API_URL)}
      <header className="page_header">
        <img src="/images/logo-cropped.png" alt="Mx Send Logo" />
      </header>

      <main className="page_content">
        <input
          ref={inputRef}
          onChange={()=>inputDesRef.current.textContent = inputRef?.current?.files[0]?.name || "Unknown"}
          type="file"
          multiple
          id="files_input"
          style={{ display: "none" }}
        />
        <label for="files_input" className="upload_section">
          <img src="/images/drop-file-icon.png" alt="Drag and Drop Icon" />
          <span ref={inputDesRef} id="drop_span">
            {"Drag & Drop files here"}
          </span>
        </label>

        <button onClick={sendFile} className="send_btn">
          Send
        </button>

        <ul className="uploading_list">
          {sending?.length > 0 && sending.map(({ name, id, size }) => {
            return (
              <li id={id}>
                <div
                  style={{ width: `${getCardById(id).percent}%` }}
                  className="overlay"
                ></div>
                <img src="/images/document-icon.png" alt="File icon" />
                <p>
                  {name} - {(size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </li>
            );
          })}
        </ul>

        <section className="uploaded_section">
            <header>
                <h3>Uploaded Files</h3>
                <button onClick={refetch}>
                    <FaSync />
                </button>
            </header>
          <ul id="uploads_list" className="uploads_list">
            {isPending ? (
                <Loader size="py-15 w-full" />
            ) : data?.length > 0 && data.map(({file_name, upload_id}) => {
              return (
                <li>
                  <div>
                    <img src="/images/document-icon.png" alt="File icon" />
                    <a href={`/api/upload/${upload_id}`} class="download_btn">
                      <DownloadIcon />
                    </a>
                  </div>
                    <p>{file_name}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
