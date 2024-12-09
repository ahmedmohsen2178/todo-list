// import { Button, DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, Input, Stack, Table } from "@chakra-ui/react"
import { Button, Table } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import { Field } from "@/components/ui/field"


const Home = () => {

interface Itask {
    task : string,
    documentId : string
}

const[datas , setdatas] = useState<Itask[]>([])
// const [taskedit , setedit] = useState({
//     documentId : "",
//     task : ""
// })
const nav = useNavigate();

// show data
const getdata = () =>{
    axios.get('http://localhost:1337/api/tasks')
    .then(res => setdatas(res.data.data))
    .catch(err => console.log(err))
}
useEffect( ()=>{
    getdata()
},[])

// delete button 
const handledelete  = (documentId: string) =>{
        axios.delete(`http://localhost:1337/api/tasks/${documentId}`)
        .then(()=> getdata())
        .catch(err => (console.log(err)
        ))
    }

// update button using this fun in dialog
// const handleupdate = () => {
//     axios.put(`http://localhost:1337/api/tasks/${taskedit.documentId}`,
//         {
//             data : {
//                 task : taskedit.task
//             }
//         }
//     )
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
// }    

// using in dialog
// const ref = useRef<HTMLInputElement>(null)

// using in dailog
// const updatechage:React.ChangeEventHandler<HTMLInputElement> = (e) =>{
//     const {value} = e.target
//     setedit({...taskedit,task:value})
// }


return (
<>
    {/* <DialogRoot initialFocusEl={() => ref.current}>
        <DialogTrigger asChild>
            <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Dialog Header</DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
            <Stack gap="4">
                <Field label="First Name">
                <Input 
                value={taskedit.task}
                onChange={updatechage}
                placeholder="First Name" />
                </Field>
            </Stack>
            </DialogBody>
            <DialogFooter>
            <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button onClick={handleupdate}>Save</Button>
            </DialogFooter>
        </DialogContent>
    </DialogRoot> */}

<Table.Root size="sm">
    <Table.Header>
        <Table.Row>
            <Table.ColumnHeader display="flex" justifyContent="space-between" alignItems="center">
                <p>Tasks</p>
                <Button
                    onClick={() => {location.replace("Create")}}
                    colorPalette="teal" variant="solid" size="lg" ml="5">add 
                </Button>
            </Table.ColumnHeader>
        </Table.Row>
    </Table.Header>

    <Table.Body>
        {datas.map((item) => (
            <Table.Row gap="14" key={item.documentId}>
                <Table.Cell display="flex" justifyContent="space-between" alignItems="center">
                    <p>{item.task}</p> 
                    <div className="btns" >
                        <Button mr="4" colorPalette="red"
                        onClick={()=> handledelete(item.documentId)}>Delete</Button>

                {/* <DialogRoot>
                    <DialogTrigger asChild>
                        <Button colorPalette="blue"
                            onClick={()=> {
                            setedit({documentId:item.documentId,task:item.task})}}>Update
                        </Button>
                    </DialogTrigger>
                </DialogRoot> */}
                            <Button colorPalette="blue"
                                onClick={()=> {
                                nav(`/update/${item.documentId}`)}}>Update
                            </Button>
                    </div>
                </Table.Cell>
            </Table.Row>
        ))}
    </Table.Body>

</Table.Root>
</>




)}

export default Home;
