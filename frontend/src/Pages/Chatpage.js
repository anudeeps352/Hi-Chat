import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/misc/SideDrawer";
import MyChats from "../components/MyChats";
import { ChatState } from "../context/ChatProvider";

const Chatpage = () => {

    const {user} =ChatState();
    const [fetchAgain, setfetchAgain] = useState(false)
  
const [chats,setChats]=useState([]);
    
    return ( <div style={{width:"100%"}}>
    {user && <SideDrawer/>}
    <Box
    d="flex"
    justifyContent="space-between"
    w="100%"
    h="91.5vh"
    p="10px"
    >
        {user && (<MyChats fetchAgain={fetchAgain}></MyChats>)}
        {user && (<ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}></ChatBox>)}
    </Box>
    </div>);
}

export default Chatpage