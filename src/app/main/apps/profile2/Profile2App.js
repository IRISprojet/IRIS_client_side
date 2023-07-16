import FusePageCarded from "@fuse/core/FusePageCarded";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Profile2Header from "./Profile2Header";
import BasicInfoTab from "./tabs/BasicInfoTab";
import AccountSecurityTab from "./tabs/AccountSecurityTab";
import DeleteAccountTab from "./tabs/DeleteAccountTab";
import ManageSession from "./tabs/ManageSessions";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required("You must enter a product name")
    .min(5, "The product name must be at least 5 characters"),
});

function Profile2App(props) {
  const dispatch = useDispatch();

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <FusePageCarded
      header={<Profile2Header />}
      content={
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64 border-b-1" }}
          >
            <Tab
              className="h-64"
              style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              icon={<FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>}
              label={<span style={{ marginLeft: "8px" }}>Basic Info</span>}
            />

            <Tab
              className="h-64"
              style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              icon={<FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>}
              label={<span style={{ marginLeft: "8px" }}>Account security</span>}
            />
           
            <Tab
              className="h-64"
              style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              icon={<FuseSvgIcon>material-outline:devices</FuseSvgIcon>}
              label={<span style={{ marginLeft: "8px" }}>Manage sessions</span>}
            />
            <Tab
              className="h-64"
              style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              icon={<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>}
              label={<span style={{ marginLeft: "8px" }}>Delete account</span>}
            />
          </Tabs>
          <div className="p-16 sm:p-24 max-w-3xl">
            <div className={tabValue !== 0 ? "hidden" : ""}>
              <BasicInfoTab />
            </div>
            <div className={tabValue !== 1 ? "hidden" : ""}>
              <AccountSecurityTab />
            </div>
            <div className={tabValue !== 2 ? "hidden" : ""}>
              <ManageSession />
            </div>

            <div className={tabValue !== 3 ? "hidden" : ""}>
              <DeleteAccountTab />
            </div>
          </div>
        </>
      }
    />
  );
}

export default Profile2App;
