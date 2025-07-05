import "@testing-library/jest-dom";

import { createSerializer, matchers as emotionMatchers } from "@emotion/jest";
import { jest } from "@jest/globals";

const spy = jest.spyOn(console, "warn").mockImplementation(() => {});

expect.extend(emotionMatchers);
expect.addSnapshotSerializer(createSerializer());

afterEach(() => {
  spy.mockClear();
});
