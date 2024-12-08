import { AddIcon } from '@chakra-ui/icons';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getSender } from '../config/ChatLogics';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';
import { Button } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';
import { API_URL } from '../config/config';
const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState('');

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    console.log({ user });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(config);
      const { data } = await axios.get(`${API_URL}/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir="column"
      alignItems="center"
      p={3} //adjust display according to whether chat selected
      w={{ base: '100%', md: '31%' }}
      borderRadius="lg"
      borderWidth="1px"
      bg="#4F709C"
      border="none"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        bg="#4F709C"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex" //modal fr making grp chat
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map(
              (
                chat //mychats all chats section
              ) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? '#4F709C' : '#E8E8E8'}
                  color={selectedChat === chat ? 'white' : 'black'}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && ( //provide latest chat in mychat
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + '...'
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              )
            )}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
