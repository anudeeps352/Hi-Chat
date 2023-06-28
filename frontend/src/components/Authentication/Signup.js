// import React from 'react'
// import { Button, FormControl, FormLabel, InputGroup, InputRightElement, VStack,Input} from '@chakra-ui/react'
// import { useState } from 'react'
// import { useToast } from '@chakra-ui/react';
// import axios from 'axios';
// import {useHistory} from 'react-router-dom';
// const Signup = () => {
//     const [show, setShow] = useState(false)
//     const[name,setName]=useState()
//     const[email,setEmail]=useState()
//     const[password,setPassword]=useState()
//     const[confirmpassword,setConfirmPassword]=useState() 
//     const[pic,setPic]=useState() 
//     const [picLoading, setPicLoading] = useState(false);
//     const handleClick= () => setShow(!show);
//     const toast=useToast();
//     const history=useHistory();



//     const submitHandler =async()=>{

//         setPicLoading(true);

//         if(!name||!email||!password||!confirmpassword){
//             toast({
//                 title:"Please fill all fields",
//                 status:"warning",
//                 duration:5000,
//                 isClosable:true,
//                 position:"bottom"
//             });
//             setPicLoading(false);
//             return;
//         }

//         if((password!==confirmpassword)){
//             toast({
//                 title:"Passwords dont match",
//                 status:"warning",
//                 duration:5000,
//                 isClosable:true,
//                 position:"bottom"
//             });
            
//             return;
//         }
//         try {
//             const config={
//                 headers:{
//                     "Content-type":"application/json",
//                 },
//             };

//             const { data }=await axios.post("/api/user",{name,email,password,pic},
//             config);

//             toast({
//                 title:"Registered",
//                 status:"success",
//                 duration:5000,
//                 isClosable:true,
//                 position:"bottom"
//             });

//             localStorage.setItem('userInfo',JSON.stringify(data));

//          setLoading=(false);
//          history.push('/chats')   
//         } catch (error) {
//             toast({
//                 title:"Error",
//                 description:error.response.data.message,
//                 status:"error",
//                 duration:5000,
//                 isClosable:true,
//                 position:"bottom"
//             });
//             setPicLoading=(false);
            
//         }
//     };

//     const postDetails=(pics)=>{
//         setPicLoading(true);
//         if(pic===undefined){
//             toast({
//                 title:"Please Select an Image",
//                 status:"warning",
//                 duration:5000,
//                 isClosable:true,
//                 position:"bottom"
//             });
//             return
//         }

//         if(pics.type==="image/jpeg" || pics.type==="image/png"){
//             const data=new FormData();
//             data.append("file",pics);
//             data.append("upload_preset","hichat");
//             data.append("cloud_name","drzg3h0tu");
//             // fetch("https://api.cloudinary.com/v1_1/drzg3h0tu/image/upload",{
//             // method:'post',
//             // body:data
//             // }).then((res)=>res.json())
//             // .then(data=>{
//             axios.post("https://api.cloudinary.com/v1_1/drzg3h0tu/image/upload", data)
//         .then((response) => {
//           console.log("Cloudinary response:", response);
//                 setPic(data.url.toString());
//                 setPicLoading(false);
//                 toast({
//                     title: "Image uploaded successfully!",
//                     status: "success",
//                     duration: 5000,
//                     isClosable: true,
//                     position: "bottom",
//                   });
//             })
//             .catch((err)=>{
//                 console.log(err);
//                 setPicLoading(false);
//             });
//         }
//         else{
//             toast({
//                 title:"Please select an Image",
//                 status:"warning",
//                 duration:5000,
//                 isClosable:true,
//                 position:"bottom"
//             });
//             setPicLoading(false);
//             return;
//         }
//     }



//   return (
//     <VStack spacing="5px" color='black'>
//     <FormControl id='first-name' isRequired>
//         <FormLabel>Name </FormLabel>
//             <Input
//                 placeholders='Enter Your Name'
//                 onChange={(e)=>setName(e.target.value)}
//             />
//     </FormControl>

//     <FormControl id='email' isRequired>
//         <FormLabel>Email </FormLabel>
//             <Input
//                 placeholders='Enter Your E-mail'
//                 onChange={(e)=>setEmail(e.target.value)}
//             />
//     </FormControl>

//     <FormControl id='password' isRequired>
//         <FormLabel>Password </FormLabel>
//             <InputGroup>
//             <Input
//                 type={show?"text":"password"}
//                 placeholders="Enter Your Email"
//                 onChange={(e)=>setPassword(e.target.value)}
//             />
//             <InputRightElement width="4.5rem">
//                 <Button h="1.75rem" size="sm" onClick={handleClick}>
//                     {show ? "Hide":"Show"}
//                 </Button>
//             </InputRightElement>
//             </InputGroup>
//     </FormControl>

//     <FormControl id='password' isRequired>
//         <FormLabel>Confirm Password </FormLabel>
//             <InputGroup>
//             <Input
//                 type={show?"text":"password"}
//                 placeholders="Confirm password"
//                 onChange={(e)=>setConfirmPassword(e.target.value)}
//             />
//             <InputRightElement width="4.5rem">
//                 <Button h="1.75rem" size="sm" onClick={handleClick}>
//                     {show ? "Hide":"Show"}
//                 </Button>
//             </InputRightElement>
//             </InputGroup>
//     </FormControl>

//     <FormControl id='pic' >
//         <FormLabel>Upload your Picture</FormLabel>
//             <Input
//                 type="file"
//                 p={1.5}
//                 accept="image/*"
//                 onChange={(e)=>postDetails(e.target.files[0])}
//             />
//     </FormControl>
//     <Button
//         colorScheme="blue"
//         width="100%"
//         style={{marginTop:15}}
//         onClick={submitHandler}
//         isLoading={picLoading}
//      >   Signup
//     </Button>
//     </VStack>
//   )
// }

// export default Signup











import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured line 298!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;