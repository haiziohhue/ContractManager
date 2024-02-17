import { useState } from "react";
import { upload } from "../api/axios";
import "../style.css";

export const Upload = () => {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [firstCompany,setFirstCompany] = useState("");
  const [secondCompany,setSecondCompany] = useState("");
  const [contractDate,setContractDate] = useState("");
  const [img, setImg] = useState();
  const [pdf, setPdf] = useState();
  const handleSubmit = async (e:any) => {
    console.log(title, img, pdf);
    e.preventDefault();

    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    formData.append("img", img);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    formData.append("pdf", pdf);

    formData.append("title", title);
    formData.append("keyword", keyword);
    formData.append("firstCompany", firstCompany);
    formData.append("secondCompany", secondCompany);
    formData.append("contractDate", contractDate);


    console.log(formData);
    try {
      await upload(formData);
      alert("上传成功");
      window.location.reload();
    } catch (error) {
      alert("上传失败");
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="UploadForm">
      <h2>上传合同</h2>
      <div>
        <label>标题:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>关键字:</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div>
        <label>甲方:</label>
        <input
          type="text"
          value={firstCompany}
          onChange={(e) => setFirstCompany(e.target.value)}
        />
      </div>
      <div>
        <label>乙方:</label>
        <input
          type="text"
          value={secondCompany}
          onChange={(e) => setSecondCompany(e.target.value)}
        />
      </div>
      <div>
        <label>签署日期:</label>
        <input
          type="date"
          value={contractDate}
          onChange={(e) => setContractDate(e.target.value)}
        />
      </div>
      <div>
        <label>上传图片:</label>
        <input type="file" onChange={(e) => e.target.files?setImg(e.target.files[0] as any):null} />
      </div>
      <div>
        <label>上传PDF:</label>
        <input type="file" onChange={(e) => e.target.files?setPdf(e.target.files[0] as any):null} />
      </div>
      <div>
        <div></div>
        <button type="submit">Upload</button>
      </div>
    </form>
  );
};
