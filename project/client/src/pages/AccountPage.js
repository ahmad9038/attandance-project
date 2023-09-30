import React, { useState } from "react";

import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";

// images
import logo from "../img/logo.png";

//components
import Login from "../components/Login";

//scss
import "../scss/accountPage.scss";

const AccountPage = () => {
  const [selectedRole, setSelectedRole] = useState("Student");

  const handleTabChange = (index) => {
    // Update selectedTab based on the index of the tab
    if (index === 0) {
      setSelectedRole("Student");
    } else if (index === 1) {
      setSelectedRole("Teacher");
    } else if (index === 2) {
      setSelectedRole("Admin");
    }
  };

  return (
    <Flex className="accountPage">
      <Container maxW="xl" centerContent>
        <Box
          bg={"white"}
          width={{ base: "95%", sm: "90%", md: "85%" }}
          p={5}
          borderRadius={"10px"}
          className="pageContainer"
        >
          <img className="logo" src={logo} alt="numl logo" />

          <Tabs onChange={handleTabChange}>
            <TabList>
              <Tab
                _hover={{ color: "black", bg: "transparent" }}
                _selected={{ color: "white", bg: "#353535" }}
                width={"50%"}
              >
                Student Login
              </Tab>
              <Tab
                _hover={{ color: "black", bg: "transparent" }}
                _selected={{ color: "white", bg: "#353535" }}
                width={"50%"}
              >
                Teacher Login
              </Tab>
              <Tab
                _hover={{ color: "black", bg: "transparent" }}
                _selected={{ color: "white", bg: "#353535" }}
                width={"50%"}
              >
                Admin Login
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>
                  <Login selectedRole={selectedRole} />
                </p>
              </TabPanel>
              <TabPanel>
                <p>
                  <Login selectedRole={selectedRole} />
                </p>
              </TabPanel>
              <TabPanel>
                <p>
                  <Login selectedRole={selectedRole} />
                </p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Flex>
  );
};

export default AccountPage;
