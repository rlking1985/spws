// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { WorkflowData, SpwsResponse } from "../../types";
import { Workflow } from "../../types/workflowData";
import getListStaticName from "../../utils/getListStaticName";

interface Operation extends SpwsResponse {
  data: WorkflowData;
}

type Params = {
  // The URL of the Web site containing the item on which the workflow is being run.
  webURL?: string;
  // The URL location of an item on which a workflow is being run.
  itemURL: string;
};

/**
 * @name GetWorkflowDataForItem
 * @link https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2007/aa980940(v=office.12)
 */
const GetWorkflowDataForItem = async ({
  webURL = defaults.webURL,
  ...params
}: Params) => {
  // Destruct Params
  const { itemURL } = params;

  // Create request object
  const req = new SpwsRequest({
    webService: WebServices.Workflow,
    webURL,
    soapAction:
      "http://schemas.microsoft.com/sharepoint/soap/workflow/GetWorkflowDataForItem",
  });

  // Create envelope
  req.createEnvelope(
    `<GetWorkflowDataForItem xmlns="http://schemas.microsoft.com/sharepoint/soap/workflow/">
        <item>
        ${itemURL}
        </item>
    </GetWorkflowDataForItem>`
  );

  try {
    // TODO: Continue parsing xml response
    const res = await req.send();

    let data: WorkflowData = {
      workflows: Array.from(res.responseXML.querySelectorAll("Workflow")).map(
        (node) => {
          // Get the attributes of the node
          const attributes: Workflow = Array.from(node.attributes).reduce(
            (workflow, attr) => {
              // Get the name of the attribute
              const name = attr.nodeName as keyof Workflow;
              // Get the value of the attribute
              const value = attr.nodeValue || "";
              // Set the attribute in the workflow object
              workflow[name] = value;
              // Return the workflow object
              return workflow;
            },
            {} as Workflow
          );
          return attributes;
        }
      ),
    };

    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default GetWorkflowDataForItem;
