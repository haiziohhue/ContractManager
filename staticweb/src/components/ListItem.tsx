import { deleteById, downloadFile } from "../api/axios";
import "../style.css";
import { getFileExtension } from "../utils/fileExtension";
export const ListItem = (prop: EntityContract) => {
  const dateSwitch = (date: Date|null|undefined):string =>{
    if(date){
      const current = new Date(date)
      return current.toISOString().split('T')[0]
    } else{
      return ""
    }}
  const downloadPDF = () => {
    if (prop.contractPdfName){
      downloadFile(prop.contractPdfName).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        const extension = getFileExtension(prop.contractPdfName as string)
        a.href = url;
        a.download = `${prop.title}.${extension}`; // 设置下载后的文件名
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }
  }
  const deleteRecord =async () => {
    const confirmed = confirm("确定要删除吗？");
  if (confirmed) {
    await deleteById(prop.id);
    alert("删除成功");
    window.location.reload();
  }
  };
  return (
    <>
      <div className="row">
        <div>{prop.id}</div>
        <div>{prop.title ?? null}</div>
        <div>{prop.keyword ?? null}</div>
        <div>{prop.firstCompany?? null}</div>
        <div>{prop.secondCompany?? null}</div>
        <div>{dateSwitch(prop.contractDate)}</div>

        <img src={`/rowfiles/${prop.coverImgName}`} alt="无封面" />
        <div>
          <a href="#" onClick={downloadPDF} style={{margin:'0 12px'}}>
            下载PDF
          </a>
          <a href="#" onClick={deleteRecord}>
            {" "}
            删除记录
          </a>
        </div>
      </div>
    </>
  );
};
export const ListHead = ()=>{
  return <div className="row">
        <div>ID</div>
        <div>标题</div>
        <div>关键词</div>
        <div>甲方</div>
        <div>乙方</div>
        <div>签署日期</div>
        <div>封面</div>
        <div>操作</div>
      </div>
}