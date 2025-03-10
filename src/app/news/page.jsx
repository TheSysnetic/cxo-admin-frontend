import Breadcrumb from "@/components/Breadcrumb";
import NewsData from "@/components/news/show-data";
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
        <Breadcrumb title='News' page='News' />
        <NewsData />
      </MasterLayout>
    </>
  );
};

export default Page;
