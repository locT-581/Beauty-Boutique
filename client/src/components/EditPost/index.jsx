import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import CryptoJS from "crypto-js";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { addEmptyBlog } from "./redux/reducers/blogSlice";
import { storage } from "./config/firebaseConfig";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

function EditPost() {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blogSlice);
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const secretKey = "hhduuc";

  useEffect(() => {
    // Khôi phục dữ liệu từ Local Storage khi tải lại trang
    const savedEncryptedContent = localStorage.getItem(
      "encryptedEditorContent"
    );
    // Kiểm tra có dữ liệu trong Local Storage không
    if (savedEncryptedContent) {
      const bytes = CryptoJS.AES.decrypt(savedEncryptedContent, secretKey);
      const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
      setContent(decryptedContent);
    }
  }, []);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    document.getElementById("content").innerHTML =
      editorRef.current.getContent();
    getImage();
  };

  // Get image in content if have
  const getImage = () => {
    const content = editorRef.current.getContent();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const img = doc.querySelectorAll("img");

    const metadata = {
      contentType: "image/jpeg",
    };
    img.forEach((i, index) => {
      console.log(i);
      // Upload image to firebase storage
      const storageRef = ref(storage, `blogs_image/${blog.id}/${index}.jpg`);

      fetch(i.src)
        .then((res) => res.blob())
        .then((blob) => {
          // Upload file lên Firebase Storage
          const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  console.log("Upload is done");
                  break;
              }
            },
            (error) => {
              switch (error.code) {
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  break;
                case "storage/unknown":
                  // Unknown error occurred, inspect error.serverResponse
                  break;
                default:
                  break;
              }
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                i.src = downloadURL;
                console.log(editorRef.current.getContent());
              });
            }
          );
        });
    });
  };

  useEffect(() => {
    // Auto save to Local Storage every 15 seconds
    const interval = setInterval(() => {
      const encryptedContent = CryptoJS.AES.encrypt(
        editorRef.current.getContent(),
        secretKey
      ).toString();
      localStorage.setItem("encryptedEditorContent", encryptedContent);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    dispatch(addEmptyBlog({ title: "New Blog" }));
  };

  return (
    <div style={{ paddingX: "20px" }}>
      <h2>Editor</h2>
      <button type="submit" onClick={handleAdd}>
        Tạo mới
      </button>
      <Editor
        apiKey="mpgdror8o4mvc5y6sszq8n82esvpx4vtouv2o26ata3bwroc"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | fontfamily | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | link | help ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
      />
      <button onClick={log}>Log editor content</button>
      <div>
        <h2>Content</h2>
        <div id="content"></div>
      </div>
    </div>
  );
}

export default EditPost;
