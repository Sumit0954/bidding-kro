import { portal_bids_column } from "../../../elements/CustomDataTable/AdminColumnData";
import DataTable from "../../../elements/CustomDataTable/DataTable";

const PortalBidsList = () => {
  return (
    <>
      <DataTable
        propsColumn={portal_bids_column}
        propsData={[]}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default PortalBidsList;
