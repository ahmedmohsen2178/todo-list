import { AbsoluteCenter, Box, Button, Input, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Field } from "@/components/ui/field"


const Update = () => {
  interface Itask {
    task : string,
    documentId : string
}
const[datas , setdatas] = useState<string>("")
const nav = useNavigate()

// use to get id for the input i click on it
const { documentId } = useParams();

const getdata = () =>{    
  axios.get(`http://localhost:1337/api/tasks/${documentId}`)
  .then(res => { 
    const { task } = res.data.data;
    setdatas(task)
  })
  .catch(err => console.log(err))
}
useEffect( ()=>{
    getdata()
},[])


const handleupdate : React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();
  axios.put(`http://localhost:1337/api/tasks/${documentId}`,{
      data : {
          task : datas
  }
  }
  )
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(()=> nav("/home"))
}    
// console.log(datas);

  return (

    <Box position="relative" h="150px">
      <AbsoluteCenter p="4" axis="both">
            <form onSubmit={handleupdate}>
              <Stack gap="4" align="flex-start" maxW="lg">
                <Field label="Task Edit">
                  <Input size="lg" maxW="2xl"
                  value={datas}
                  onChange={(e) => setdatas( e.target.value )}
                  />
                </Field>
                <Button size="lg" type="submit">Submit</Button>
              </Stack>
            </form>    
      </AbsoluteCenter>
    </Box>

    
)
}

export default Update