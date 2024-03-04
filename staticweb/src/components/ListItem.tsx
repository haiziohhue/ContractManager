import { useState } from "react";
import { deleteById, downloadFile, update } from "../api/axios";
import "../style.css";
import { getFileExtension } from "../utils/fileExtension";
export const ListItem = (prop: EntityContract) => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(prop);
  const dateSwitch = (date: Date | null | undefined): string => {
    if (date) {
      const current = new Date(date);
      return current.toISOString().split("T")[0];
    } else {
      return "";
    }
  };
  const downloadPDF = () => {
    if (prop.contractPdfName) {
      downloadFile(prop.contractPdfName).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        const extension = getFileExtension(prop.contractPdfName as string);
        a.href = url;
        a.download = `${prop.title}.${extension}`; // 设置下载后的文件名
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }
  };
  const deleteRecord = async () => {
    const confirmed = confirm("确定要删除吗？");
    if (confirmed) {
      await deleteById(prop.id);
      alert("删除成功");
      window.location.reload();
    }
  };
  const editRecord = async () => {
    setEdit(!edit);
  };
  const saveRecord = async () => {
    setEdit(!edit);
    await update(formData.id,formData)
    alert("保存成功");
    window.location.reload();

  };
  return (
    <>
      {edit ? (
        <form className="row">
          <div>{formData.id}</div>
          <input value={formData.title ?? ""} onChange={(e)=>{setFormData({...formData,title:e.target.value})}}/>
          <input value={formData.keyword ?? ""} onChange={(e)=>{setFormData({...formData,keyword:e.target.value})}}/>
          <input value={formData.firstCompany} onChange={(e)=>{setFormData({...formData,firstCompany:e.target.value})}}/>
          <input value={formData.secondCompany} onChange={(e)=>{setFormData({...formData,secondCompany:e.target.value})}}/>
          <input
            type="date"
            value={String(formData.contractDate)??""}
            onChange={(e)=>{setFormData({...formData,contractDate:new Date(e.target.value)})}}
          />

          <img src={`/rowfiles/${formData.coverImgName}`} alt="无封面" />
          <div>
            <a href="#" onClick={saveRecord} style={{ margin: "0 12px" }}>
              保存
            </a>
          </div>
        </form>
      ) : (
        <div className="row">
          <div>{formData.id}</div>
          <div>{formData.title ?? null}</div>
          <div>{formData.keyword ?? null}</div>
          <div>{formData.firstCompany ?? null}</div>
          <div>{formData.secondCompany ?? null}</div>
          <div>{dateSwitch(formData.contractDate)}</div>

          <img src={`/rowfiles/${formData.coverImgName}`} alt="无封面" />
          <div>
            {formData.contractPdfName ? (
              <a href="#" onClick={downloadPDF} style={{ margin: "0 12px" }}>
                {" "}
                下载
              </a>
            ) : null}
            <a href="#" onClick={editRecord}>
              {" "}
              编辑
              {" "}
            </a>
            <a href="#" onClick={deleteRecord}>
              {" "}
              删除
            </a>
          </div>
        </div>
      )}
    </>
  );
};
export const ListHead = () => {
  return (
    <div className="row">
      <div>ID</div>
      <div>标题</div>
      <div>关键词</div>
      <div>甲方</div>
      <div>乙方</div>
      <div>签署日期</div>
      <div>封面</div>
      <div>操作</div>
    </div>
  );
};
