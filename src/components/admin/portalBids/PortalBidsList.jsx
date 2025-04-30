import { useEffect, useState } from "react";
import { portal_bids_column } from "../../../elements/CustomDataTable/AdminColumnData";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";

const PortalBidsList = () => {
  const [portalBids, setPortalBids] = useState([]);
  const fetechPortalBids = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        AdminApiUrls?.GET_PORTAL_BIDS,
        "",
        true
      );
      if (response?.status === 200) {
        setPortalBids(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetechPortalBids();
  }, []);
  return (
    <>
      <DataTable
        propsColumn={portal_bids_column}
        propsData={portalBids || []}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default PortalBidsList;
