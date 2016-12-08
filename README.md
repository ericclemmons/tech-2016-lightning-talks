# Eric's Lightning Talks

- [Storybook in 10 minutes](#storybook)
- [Styled Components in 10 minutes](#styled-components)
- [MobX in 10 minutes](#mobx)
- [Jest in 10 minutes](#jest)

Check out the `example` branch for all of this working in action.

### Setup

Before getting started, let's make sure this is a workable project:

1. `git init .`
2. `npm init -y`
3. `nvm use 7.2.0`
4. `yarn add react react-dom`

---

### Storybook

![Storybook](https://getstorybook.io/static/media/demo.f13d28a7.gif)
> https://getstorybook.io/

- Playground for predictable, isolated development of React Components.
- "Stories" to describe different use-cases.
- Live-reloading.
- "Addons" (e.g. knobs, documentation, specs, backgrounds, etc.)

#### Getting Started

2. `yarn add --dev @kadira/storybook`
3. `.stories/config.js`

  ```js
  import { configure } from "@kadira/storybook";

  const stories = require.context("..", true, /\.stories\.js$/);

  configure(() => (
    stories.keys().forEach((file) => stories(file))
  ), module);
  ```

4. `$(yarn bin)/start-storybook -p 3000`
5. Create something in `src/components/MyForm/MyForm.stories.js`

  ```js
  import React from "react";
  import { storiesOf, action } from "@kadira/storybook";

  storiesOf("MyForm", module)
    .add("default", () => (
      <p>Test!</p>
    ))
  ;
  ```
6. Add `onChange`, `onSubmit` events via the `action` helper.

--

### Styled Components

![Styled Components](https://github.com/styled-components/styled-components/raw/master/docs/assets/logo.png)
> https://github.com/styled-components/styled-components

- Co-locate styles alongside components.
- Abstract styles into a components for cleaner abstractions in the consumer.
- Auto-prefixing.
- Supports what CSS supports.
- DRYs up common styles.

#### Related Projects

- [glamor](https://github.com/threepointone/glamor)
- [styled-jsx](https://github.com/zeit/styled-jsx)
- [styletron](https://github.com/rtsao/styletron)


#### Getting Started

1. `yarn add styled-components`
2. Style a regular HTML element (e.g. `label`) in your component:

  ```js
  import styled from "styled-components";

  const Label = styled.label`
    background: #369;
    border: none;
    color: #fff;

    &:hover {
      cursor: pointer;
    }
  `;
  ```

3. You can even wrap existing components via `styled(Component)`,
   **as long as they accept the `className` prop**.

---

### MobX

![MobX](https://github.com/mobxjs/mobx/raw/master/docs/mobx.png)

> https://mobxjs.github.io/mobx/

- State management using observables & mutable structures.
- Performant rendering of only affected components.
- Less "ceremony" than Redux.

#### Getting Started

1. `yarn add mobx mobx-react`
2. `yarn add babel-preset-{latest,react,stage-2}`
3. `yarn add babel-plugin-transform-decorators-legacy`
4. Create `.babelrc`:

  ```json
  {
    "plugins": ["transform-decorators-legacy"],
    "presets": ["latest", "react", "stage-2"]
  }
  ```

5. Wrap your component with `@observer`:

  ```js
  import { observer } from "mobx-react";

  @observer
  export default class ...
  ```

6. Add `@computed` & `@observable` class properties to your component for
   internal state.

  ```js
  import { computed, intercept, observe, observable } from "mobx";

  ...
  @observable email = ""

  @computed get valid() {
    return this.email.includes("@highereducation.com");
  }
  ```

7. Add `intercept` & `observe` methods to sanitize input & fire events:

  ```js
  componentDidMount() {
    intercept(this, "email", (change) => {
      change.newValue = change.newValue.trimLeft().trimRight();

      return change;
    });

    observe(this, "email", (value) => this.props.onChange({ email: value }));
  }
  ```

---

### Jest

![Jest](https://github.com/ericclemmons/jest-storybook/raw/master/jest.png)
> https://facebook.github.io/jest/

- Built-in support for Babel.
- Snapshots.
- _Fast_ with caching.
- Easy to adopt in existing projects.

1. `yarn add --dev jest`
2. `$(yarn bin)/jest`
3. Add tests to `__tests__` in any folder in the usual `describe` / `it` structure.
4. Convert a `.toBe(...)` assertion to `.toMatchSnapshot();`.

Snapshotting existing Storybook stories:
> https://github.com/ericclemmons/jest-storybook
