import Breadcrumb from "@/components/Breadcrumb";
import MagazineData from "@/components/magazine/show-data";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "CxO Global Forum",
  description:
    "Wowdash NEXT JS is a developer-friendly, ready-to-use admin template designed for building attractive, scalable, and high-performing web applications.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Magazine' page='Magazine' />
        <MagazineData />
      </MasterLayout>
    </>
  );
};

export default Page;
