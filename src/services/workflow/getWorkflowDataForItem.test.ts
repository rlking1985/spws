import { SpwsError } from "../../classes";
import getWorkflowDataForItem from "./getWorkflowDataForItem";

describe("getListViewThreshold", () => {
  it("Passes: Threshold is returned", async () => {
    const res = await getWorkflowDataForItem({
      itemURL:
        "http://objectpoint/sites/spws/operations/Lists/Workflows/1_.000",
    });

    console.log("res :>> ", res.data);
  });
});
