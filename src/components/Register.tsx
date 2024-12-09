import { Button, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () =>{ 

    interface FormValues {
        username: string
        email : string
        password: string
    }
// دي الستيت اللي هنحفظ فيها الريسبونس
// بالتالي هنستقبل الريسبونس في السيت داتا
    const [data,setdata] = useState<FormValues[]>([])
//  الريجيستر دي الستيت اللي هنحفظ فيها الداتا اللي هتيجي من الانبوتس
    const [register,setregister] = useState({
            username : "",
            email : "" ,
            password : ""
    })

    const navigate = useNavigate()

// function of submit data
    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:1337/api/auth/local/register',
    // دي الداتا اللي هنبعتها للريسبونس
            {
                    username : register.username ,
                    email : register.email,
                    password : register.password
                })
            .then(res => {
                setdata( res.data.data)
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    // this function take input's new values 
    const handleinputchange = (event : React.ChangeEvent<HTMLInputElement>) =>{
        const {name , value } = event.target
    
            setregister(()=>({
                ...register,[name]: value
            }))
        };


    return(
    
        <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="md">
        <Field
            label="Username"
            
        >
            <Input
            id="username"
            name="username"
            value={register.username}
            onChange={handleinputchange}
            />
        </Field>

        <Field
            label="Email"
        >
            <Input
            id="email"
            name="email"
            value={register.email}
            onChange={handleinputchange}
            />
        </Field>

        <Field label="Password">
            <Input
            id="password"
            name="password"
            value={register.password}
            onChange={handleinputchange}/>
        </Field>

        <Button size="lg" colorPalette="teal" type="submit"
        // onClick={() => location.replace("/login")}
        >Submit</Button>
        </Stack>
    </form>
)}

export default Register;