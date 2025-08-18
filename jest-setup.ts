import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom/matchers";

import { createSerializer, matchers as emotionMatchers } from "@emotion/jest";
import { jest } from "@jest/globals";

const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
expect.extend(emotionMatchers);
expect.addSnapshotSerializer(createSerializer());

afterEach(() => {
  spy.mockClear();
});
