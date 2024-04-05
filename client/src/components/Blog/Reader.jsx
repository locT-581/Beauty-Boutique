import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
function BlogReader () {

    return (
        <main>
            <Header/>
            <div className="text-center text-[30px] mx-[200px] border-b-[4px] border-indigo-900">
                <h1>
                    Hoa chúc mừng thành công đẹp, sang trọng
                </h1>

            </div>
            <p className="text-wrap mx-[200px]">
                Câu hỏi: “Tặng hoa chúc mừng thành công như thế nào” là câu hỏi đang nhận được rất nhiều sự quan tâm của các bạn.
                mọi người. Hiểu được tâm lý này nên trong nội dung dưới đây chúng tôi sẽ chia sẻ một số thông tin về
                vấn đề này để bạn có thể hiểu rõ hơn và trả lời được câu hỏi này cho mình. Hãy theo dõi bài viết chia sẻ
                dưới.
            </p>
            <Footer/>
        </main>
       
    );
}
export default BlogReader;
