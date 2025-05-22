import { documents_column } from "../../../../elements/CustomDataTable/PortalColumnData";
import DataTable from "../../../../elements/CustomDataTable/DataTable";

const Documents = ({ bidDetails }) => {
  return (
    <>
      <DataTable
        propsColumn={documents_column}
        propsData={bidDetails?.document || []}
        customClassName="portal-data-table"
      />
    </>
  );
};

export default Documents;
