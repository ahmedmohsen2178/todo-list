import { Button, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

const [login,setlogin] = useState({
    identifier : "",
    password : ""
})

// navigate is used to move from page to another page 
const navigate = useNavigate()

// this fun is used to submit form and fetch post data from backend
const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post('http://localhost:1337/api/auth/local',
        // دي الداتا اللي هنبعتها للريسبونس
                {
                        identifier : login.identifier ,
                        password : login.password
                    })
                .then((res) => {
                    const token = res.data.jwt; 
                    localStorage.setItem('token', token);
                    navigate("/home")
                })
                .catch(err => console.log(err))    
}

// this fun is using to handle changes in inputs
const handleinputchange = (event : React.ChangeEvent<HTMLInputElement>) =>{
    // const name = event.target.name;
    // const value = event.target.value;
        const {name , value} = event.target
    setlogin(()=>({
        ...login,[name]:value
    }));
};

return (
<form onSubmit={onSubmit}>
    <Stack gap="4" align="flex-start" maxW="md">
        <Field label="Email">
        <Input
        name="identifier"
        value={login.identifier}
        onChange={handleinputchange}/>
        </Field>

        <Field
        label="Password">
        <Input
        name="password"
        value={login.password}
        onChange={handleinputchange}/>
        </Field>

        <Button size="lg" colorPalette="teal" type="submit">Submit</Button>
    </Stack>
</form>

)}

export default Login;