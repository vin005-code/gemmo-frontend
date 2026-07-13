'use client'
import { useState } from "react"
import styles from "./signup.module.css"

import { redirect } from "next/navigation"



export default function LoginPage(){

    const [email, setEmail] = useState("string")
    const [password, setPassword] = useState("string")

    const submitForm = async() => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create`
        console.log(email, password, url)

        const resp = await fetch(url, {
            method: "POST",
            headers: {
    'Content-Type': 'application/json',
    "accept": "application/json"
  },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
            
        })

        if (resp.status == 401){
            alert("Unauthorized");
            return
        }

        if (resp.status == 200){
            console.log(resp)
            const data = await resp.json()
            console.log(data);
            redirect("/login")

            

        }



    }


    return(

        <>


        <div 
        className={styles.Navbar}>
            <h2>Gemmo</h2>
        </div>

        <br /><br /><br />
        <br /><br /><br />

          <div className={styles.mainBoxCont}>
            <form action={submitForm} className={styles.formCotn}>

                <h1>Create Account ✨</h1>
                <p>Please signup to create your account</p>

                <br /><br />

                <label htmlFor="">Email</label>
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="user@example.com" />

                <br />
                <label htmlFor="">Password</label>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="password" />

                <br />

                <p>No account ? <a href="/login">Login</a></p>
                <button className={styles.loginButton}>Signup </button>
            </form>
        </div>
        </>
      
    )
}
