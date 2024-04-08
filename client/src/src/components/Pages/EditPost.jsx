import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  deleteBlog,
  getBlogById,
  updateBlog,
} from "../../redux/reducers/blogSlice";
import { plugins, toolbar } from "../../config/tinymceConfig";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import SplitButton from "../../UI/SliptButton";
import { uploadImage } from "../../utils/storage";
import { toast } from "react-toastify";
import toastConfig from "../../config/toastConfig";
import CircleLoadingSpin from "../../UI/Icon/CircleLoadingSpin";

const options = ["Lưu và đăng tải", "Lưu ở chế độ riêng tư", "Hủy bỏ"];

function EditPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentBlog, loading, error, message } = useSelector(
    (state) => state.blogSlice
  );
  const editorRef = useRef(null);
  const [title, setTitle] = useState(currentBlog.title);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, toastConfig);
      dispatch(clearError());
    }
    if (message) {
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    setTitle(currentBlog.title);
  }, [currentBlog.title]);

  // Auto save title
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title === "") return;
      dispatch(updateBlog({ title, id }));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [title, dispatch, id]);

  useEffect(() => {
    dispatch(getBlogById(id));
    // Auto save content
    const timeout = setInterval(() => {
      if (editorRef.current.getContent() === "") return;
      replaceImageUrl(editorRef.current.getContent()).then((result) => {
        dispatch(updateBlog({ content: result, id }));
      });
    }, 1000 * 60 * 2);

    return () => clearInterval(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  // Get image in content if have
  const replaceImageUrl = async (text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const images = doc.querySelectorAll("img");
    let result = text;

    const tasks = [];

    images.forEach(async (i, index) => {
      if (i.src.includes("base64")) {
        tasks.push(
          new Promise((resolve, reject) => {
            fetch(i.src)
              .then((res) => res.blob())
              .then((blob) => {
                uploadImage("blogs_image", blob, id, index)
                  .then((url) => {
                    result = result.replace(i.src, url);
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
              .catch((error) => {
                reject(error);
              });
          })
        );
      }
    });

    await Promise.all(tasks);
    return result;
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      replaceImageUrl(editorRef.current.getContent()).then((result) => {
        dispatch(updateBlog({ content: result, id }));
      });
    }
  };

  const handleAdd = (selectedIndex) => {
    if (selectedIndex === 0) {
      replaceImageUrl(editorRef.current.getContent()).then((result) => {
        dispatch(updateBlog({ content: result, id, displayMode: "public" }));
      });
    } else if (selectedIndex === 1) {
      replaceImageUrl(editorRef.current.getContent()).then((result) => {
        dispatch(updateBlog({ content: result, id, displayMode: "private" }));
      });
    } else if (selectedIndex === 2) {
      navigate(-1);
      dispatch(deleteBlog(id));
    }
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="edit-post px-5 overflow-x-hidden">
      <div className="flex p-2">
        <div className="flex w-[70%]">
          <button onClick={handleBack} type="button">
            <ArrowBackIosIcon />
          </button>
          <input
            onFocus={(e) => e.target.select()}
            className="outline-none w-1/2 ml-2 text-xl"
            onChange={handleChangeTitle}
            value={title}
            required
            placeholder="Tiêu đề bài viết..."
            type="text"
          />
          <span className="flex items-center text-sm text-slate-400 mx-4">
            {loading ? (
              <div className="flex">
                <CircleLoadingSpin width="25" color="black" />
                <span className="ml-2">Đang lưu...</span>
              </div>
            ) : (
              "Đã lưu"
            )}
          </span>
        </div>
        <div className="w-[30%] flex justify-end">
          <SplitButton handleClick={handleAdd} options={options} />
        </div>
      </div>
      <Editor
        onKeyDown={handleKeyDown}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={currentBlog.content}
        init={{
          statusbar: false,
          height: 500,
          resize: true,
          menubar: false,
          plugins: plugins,
          toolbar: toolbar,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
      />
    </div>
  );
}

export default EditPost;
