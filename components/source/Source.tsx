'use client'
import { useEffect, useState } from "react"
import styles from "./source.module.css"
import { title } from "process"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import youtube from "@/public/icon/youtube.png"
import Image from "next/image"


type IdProps = {
    id: string
    state: boolean
}




export default function Source({id, state}: IdProps){

    const [loading, setLoading] = useState(false)
    const [source, setSource] = useState<any[]>([])

    const [source_title, set_source_title] = useState("")
    const [data_url, set_data_url] = useState("")

    const [add_source_pop, set_add_source_pop] = useState(false)

    const [activeTab, setActiveTab] = useState(0)



    const [is_detail_open, set_detail_open] = useState(false)
    const [detail_data, set_detail_data] = useState<any>({})

    const fetchSource = async() => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/source/?document_id=${id}`

        const resp = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        const data = await resp.json()
        setSource(data)

    }


    useEffect(() => {

        setLoading(true)
        fetchSource()
        setLoading(false)

    }, [])


    if (loading){
        return(
            <div>
                Loading...
            </div>
        )
    }


    const addSource = async(type_data: string) => {

        if (!data_url){
            alert("No url")
            return;
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/source/add?document_id=${id}`
        const data = {
                            
                "type": type_data,
                "url": data_url,
                "title": source_title,
            }

        const resp = await fetch(url,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json", 
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        })

        console.log(resp)

        fetchSource();

                        

    }

    return (
        <div>


            <section>







                    <button 

                    className={styles.buttonCreateSource}
                    
                    onClick={() => {
                        
                    set_add_source_pop(!add_source_pop)
                }}>{state ? "Add Source": "+"}</button>



<br /><br /><br />
                {state ? "Existed Sources:":null}
                
                

                { add_source_pop &&

                    <div className={styles.popCont} onClick={() => {set_add_source_pop(false)}}>


                        <div className={styles.boxPop} onClick={(e)=>{
                        e.stopPropagation()
                        }} >   

                        <section className={styles.boxSection}>

                            <button className={`${activeTab == 0 ? styles.activeButton: null}`} onClick={()=>{setActiveTab(0)}} >Youtube</button>
                            <button  className={`${activeTab == 1 ? styles.activeButton: null}`} onClick={()=>{setActiveTab(1)}}>Website</button>
                            <button  className={`${activeTab == 2 ? styles.activeButton: null}`} onClick={()=>{setActiveTab(2)}}>Document (comming soon)</button>

                        </section>   

                        {
                            activeTab == 0 && (
                                <div className={styles.inputBox}>
                                    <h2>Add youtube video link</h2>
                                      <input type="text" placeholder="Add title" onChange={(e) => {set_source_title(e.target.value)}} />
                                        <input type="" placeholder="Add youtube video" onChange={(e)=>{set_data_url(e.target.value)}}/>
                                        <button onClick={()=>{addSource("youtube")}} >Submit</button>
                                </div>
                            )
                        }

                                               {
                            activeTab == 1 && (
                                <div className={styles.inputBox}>
                                    <h2>Add website link here</h2>

                                      <input type="text" placeholder="Add title" onChange={(e) => {set_source_title(e.target.value)}} />
                                        <input type="" placeholder="Add website link" onChange={(e)=>{set_data_url(e.target.value)}}/>
                                        <button onClick={()=>{addSource("website")}} >Submit</button>
                                </div>
                            )
                        }

                                               {
                            activeTab == 2 && (
                                <div>
                                    Comming Soon
                                </div>
                            )
                        }




                      
                        </div>


                    </div>

                }
            </section>








            <section className={styles.mainCont}>
                {Array.isArray(source) &&
                    source.map((item: any) => {
                        return (
                            <div 

                            className={styles.boxForSources}
                            key={item.id}
                            onClick={()=>{
                                set_detail_open(true);

                                const dataList = {
                                    "title": item.title,
                                    "data": item.url,
                                }

                                set_detail_data(dataList)
                            }}>
                                <Image src={youtube} alt="yt" width={20} height={20}>
                                </Image>

                {
                    state ? (<h4>{item.title}</h4>) : null 
                }
                                                    
                            </div>
                        )
                    })
                }

                {
                    is_detail_open && (
                        <div className={styles.popUpdetailBox} onClick={()=>{set_detail_open(false)}}>

                            <div className={styles.innerBox} onClick={(e)=>{
        e.stopPropagation()
    }}>
{detail_data.title}
<br />
<br />
                            {detail_data.data}

                            hlelo
                            </div>

                            
                        </div>

                    )
                }


            </section>
        </div>
    )
}