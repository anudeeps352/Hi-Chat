import React,{useState,} from 'react';
import { Box ,Tooltip,Button, ButtonGroup,Text,Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  Avatar,
  MenuDivider,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  Input,
  toast,
  useToast,
  Spinner,} from '@chakra-ui/react'
  import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import {useHistory} from 'react-router-dom'
import ProfileModal from './ProfileModal';
import ChatLoading from '../ChatLoading';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem'
const SideDrawer = () => {

  const {user,selectedChat,setSelectedChat,chats,setChats} = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);


  
  const history=useHistory();
  const {isOpen,onOpen,onClose}=useDisclosure();
  const toast=useToast();

  const logoutHandler=()=>{
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch=async()=>{
    if(!search)
    {
      toast({
        title:"Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
      return;
    }
    try{
      setLoading(true);

      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };
      const{data} = await axios.get(`/api/user?search=${search}`,config);
      setLoading(false);
      setSearchResult(data);
    }catch (error){
      toast({
        title:"Error Occured",
        description: "Failed to load Search Results",
        status:"error",
        duration: 5000,
        isClosable:true,
        position:"bottom-left"
      });
    }
  }

  const accessChat=async(userId)=>{

    try{
      setLoading(true);

      const config={
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`,
        },
      };

      const {data}= await axios.post('/api/chat',{userId},config)

      if(!chats.find((c)=>c._id ===data._id))setChats([data,...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch(error){
      toast({
        title:"Error fetching chat",
        description: error.message,
        status:"error",
        duration: 5000,
        isClosable:true,
        position:"bottom-left"
      });
    }
  };

  return (
    <>
    <Box
    d="flex"
    justifyContent={'space-between'}
    alignItems={"center"}
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    >
        <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
            <Button variant={'ghost'} onClick={onOpen}>
                <i className="fa fa-search" aria-hidden="true"></i>
                <Text d={{base:"none",md:"flex"}} px="4">
                    Search User 
                </Text>
            </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="work sans">
            Hi-Chat
        </Text>
        <div>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon fontSize="2xl" m={1}>
                    </BellIcon>
                </MenuButton>
            </Menu>
            
            <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
             <Avatar size="sm" cursor="pointer" name ={user.name}
              src={user.pic}
              />
            </MenuButton> 
            <MenuList>
            <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
                </ProfileModal>  
                <MenuDivider/>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList> 
            </Menu>
        </div>
    </Box>
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay></DrawerOverlay>
    <DrawerContent> <DrawerHeader borderBottomwidth="1px"> Search Users</DrawerHeader>
    <DrawerBody>
      <Box d="flex" pb={2}>
      <Input placeholder='Search by  name or email'
        mr={2}
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      <Button onClick={handleSearch}></Button>
      </Box>
      {loading?(
        <ChatLoading/>
      ):(
          searchResult?.map(user=> (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={()=>accessChat(user._id)}
            >
           </UserListItem>
          ))
      )}
      {loadingChat && <Spinner ml="auto" d="flex"/>}
    </DrawerBody>
    </DrawerContent>
    
    </Drawer>
    </>
  )
}

export default SideDrawer
