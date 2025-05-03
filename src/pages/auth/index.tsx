import { useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

import Login from "@/features/login";
import Registration from "@/features/registration";
import { EButtons, ECustomButtonColors } from "@/enums";

const Auth: React.FC = () => {
  const [selected, setSelected] = useState<string>(EButtons.Login);

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
              <Tab key={EButtons.Login} title={EButtons.Login}>
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key={EButtons.Login} title={EButtons.Login}>
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
