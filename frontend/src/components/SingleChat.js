import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { getSender, getSenderFull } from '../config/ChatLogics';
import { ChatState } from '../context/ChatProvider';
import ProfileModal from './misc/ProfileModal';
import UpdateGroupChatModal from './misc/UpdateGroupChatModal';

const SingleChat = ({fetchAgain,setfetchAgain}) => {


    const [messages, setMessages] = useState([])
    const [loading, setloading] = useState(false)
    const [newMessage, setNewMessage] = useState();
    const {user,selectedChat,setSelectedChat} = ChatState();
    const toast=useToast();

    const sendMessage=async(event)=>{
        if(event.key==="Enter" &&  newMessage){
            try {
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`Bearer ${user.token}`,
                    }
                }
                const {data}=await axios.post('/api/message',{
                    content: newMessage,
                    chatId: selectedChat._id,
                },config);
                setNewMessage("");
                setMessages([...messages,data]);
            } catch (error) {
                toast({
                    title:"Error Occured",
                    description:"Failed to send the message",
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom",
                });
            }
        }
    }

    const typingHandler=(e)=>{
        setNewMessage(e.target.value);

        //Typing Indicator logic
    }

  return <>
  (
    
        {selectedChat?(
                <>
                <Text
                fontSize={{base:"28px",md:"30px"}}
                pb={3}
                px={2}
                w="100%"
                fontFamily="Work sans"
                d="flex"
                justifyContent={{base:"space-between"}}
                alignItems="center"
                >  
                    <IconButton
                    d={{base:"flex",md:"none"}}
                    icon={<ArrowBackIcon/>}
                    onClick={()=>setSelectedChat("")}
                    >
                    </IconButton>
                    {!selectedChat.isGroupChat ?(
                        <>
                            {getSender(user,selectedChat.users)}
                            <ProfileModal user={getSenderFull(user,selectedChat.users)}>
                            </ProfileModal>
                        </>
                    ):(
                        <>
                        {!selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal
                        fetchAgain={fetchAgain}
                        setFetchAgain={setfetchAgain}
                        >
                    </UpdateGroupChatModal>
                    </>
                    )}
                    </Text>
                        <Box
                        d ="flex"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                        >
                            {loading?(
                                <Spinner
                                    size="xl"
                                    w={20}
                                    h={20}
                                    alignSelf="center"
                                    margin="auto"
                                />
                            ):(
                                    <div>
                                        {/* {Messages} */}
                                    </div>
                            )}

                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                                <Input
                                    variant="filled"
                                    bg="#E0E0E0"
                                    placeholder="Enter a message..."
                                    onChange={typingHandler}
                                    value={newMessage}
                                />
                            </FormControl>
                        </Box>
        </>):(
            <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3x1" pb={3} fontFamily="Work sans">
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
        )
    </>
}

export default SingleChat;