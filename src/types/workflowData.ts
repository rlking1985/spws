export type Workflow = {
    StatusPageUrl: string;
    Id: string;
    TemplateId: string;
    ListId: string;
    SiteId: string;
    WebId: string;
    ItemId: string;
    ItemGUID: string;
    TaskListId: string;
    AdminTaskListId: string;
    Author: string;
    Modified: string;
    Created: string;
    StatusVersion: string;
    Status1: string;
    Status2: string;
    Status3: string;
    Status4: string;
    Status5: string;
    Status6: string;
    Status7: string;
    Status8: string;
    Status9: string;
    Status10: string;
    TextStatus1: string;
    TextStatus2: string;
    TextStatus3: string;
    TextStatus4: string;
    TextStatus5: string;
    Modifications: string;
    ActivityDetails: string; // Could represent binary data, here as a string
    InstanceData: string;
    InstanceDataSize: string;
    InternalState: string;
    ProcessingId: string;
  };
  

type WorkflowData = {
    workflows: Workflow[]
};



export default WorkflowData;