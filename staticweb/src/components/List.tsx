import { useEffect, useState } from "react"
import { getFiles } from "../api/axios"
import { ListHead, ListItem } from "./ListItem"
import { Search } from "./Search"
import "../style.css";

export const List = ()=>{
    const [files,setFiles]=useState<EntityContract[]>([])
    useEffect(()=>{
        getFiles({}).then(res=>{
            const data = res.data.data.sort((a,b)=>{
                if(a.contractDate&&b.contractDate){
                    return Number(new Date(a.contractDate).getTime()<new Date(b.contractDate).getTime());
                }
                else{return Number(new Date(a.createTime).getTime()<new Date(b.createTime).getTime())}
            })
            setFiles(data)
        })
    },[])
    return <>
    <div className="list">
    <h2>合同列表</h2>
    <Search set={setFiles}/>
    <ListHead/>
    {files.length?files.map(item=>{
        return <ListItem key={item.id} {...item}/>
    }):'not list'}
    </div>
    </>
} 