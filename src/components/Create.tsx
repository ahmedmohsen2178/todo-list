import axios from "axios"
import {  useState } from "react"
import { InputGroup } from "./ui/input-group"
import { Button, HStack, Input } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const Create = () => {
 // http://localhost:1337/api/tasks

interface todos {
        task : string
}
    
const [todo,setTodos] = useState<todos[]>([])
const[youtodo, setutodo] = useState<string>("")
const navi = useNavigate()

// handle change on the inputs 
const handlechange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    const id = event.target.value
    setutodo(id)
}

// handle change on form on when submit
const handlesubmit:React.FormEventHandler<HTMLDivElement> = (e) =>{
    e.preventDefault()

// axios of post data from input to strapi
axios.post('http://localhost:1337/api/tasks',{
    data :
        {
            task : youtodo
        }
})
    .then(res => setTodos(res.data.data))
    .catch(err => console.log(err))
    .finally(()=> navi("/home"))
}

return (
<HStack gap="10" width="full" as="form" onSubmit={handlesubmit}>
    <InputGroup flex="1" >
        <Input m="4"  size="md" required  placeholder="Enter Your Task"
                value={youtodo}
                onChange={handlechange} />
    </InputGroup>

    <InputGroup flex="1">
            <Button
            type="submit"
            colorPalette="teal" variant="solid">add </Button>
    </InputGroup>
</HStack>
)}
export default Create;