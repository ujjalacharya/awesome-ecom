import { TEST_TYPE } from "../types";

export function testAction(data) {
  return {
    type: TEST_TYPE,
    payload: data,
  };
}
