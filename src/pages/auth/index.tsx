import { useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

import Login from "@/features/login";
import Registration from "@/features/registration";
import { ECustomButtonColors } from "@/enums";
import { LOGIN, SIGN_UP } from "@/constants";

const Auth: React.FC = () => {
  const [selected, setSelected] = useState(LOGIN);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              aria-label="Tabs form"
              selectedKey={selected}
              color={ECustomButtonColors.PRIMARY}
              size="md"
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key={LOGIN} title={LOGIN}>
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key={SIGN_UP} title={SIGN_UP}>
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
