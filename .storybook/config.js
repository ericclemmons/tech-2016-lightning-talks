import { configure } from "@kadira/storybook";

const stories = require.context("..", true, /\.stories\.js$/);

configure(() => (
  stories.keys().forEach((file) => stories(file))
), module);
