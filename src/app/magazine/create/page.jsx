import Breadcrumb from "@/components/Breadcrumb";
import AddMagazine from "@/components/magazine/create";
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
        <Breadcrumb title='Create Magazine' page='Create Magazine' />

        <AddMagazine />   
      </MasterLayout>
    </>
  );
};

export default Page;