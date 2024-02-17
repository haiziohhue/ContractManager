import { useEffect, useState } from "react"
import { getFiles } from "../api/axios"
import { ListHead, ListItem } from "./ListItem"
import { Search } from "./Search"
import "../style.css";

export const List = ()=>{
    const [files,setFiles]=useState<EntityContract[]>([])
    useEffect(()=>{
        getFiles({}).then(res=>{
            setFiles(res.data.data)
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