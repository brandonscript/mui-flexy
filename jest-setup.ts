import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { matchers as emotionMatchers } from "@emotion/jest";
import * as jsdomMatchers from "@testing-library/jest-dom/matchers";

import { createSerializer } from "@emotion/jest";

expect.extend(jsdomMatchers);
expect.extend(emotionMatchers);
expect.addSnapshotSerializer(createSerializer());
