import DashBoardLayerTwo from "@/components/DashBoardLayerTwo";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";

export const metadata = {
  title: "CxO global forum",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='CxO' />

        {/* DashBoardLayerOne */}
        <DashBoardLayerTwo />
      </MasterLayout>
    </>
  );
};

export default Page;
