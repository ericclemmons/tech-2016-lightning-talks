import React from "react";
import { storiesOf, action } from "@kadira/storybook";

import MyForm from "../MyForm";

storiesOf("MyForm", module)
  .add("default", () => (
    <MyForm onChange={action("onChange")} onSubmit={action("onSubmit")} />
  ))
;
