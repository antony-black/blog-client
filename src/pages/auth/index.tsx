import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import Login from "../../features/login";
import Registration from "../../features/registration";

const Auth: React.FC = () => {
  const [selected, setSelected] = useState("login");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              aria-label="Tabs form"
              selectedKey={selected}
              color="primary"
              size="md"
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key="login" title="Login">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <Registration setSelected={setSelected}/>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
