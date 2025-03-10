"use client"
import Breadcrumb from "@/components/Breadcrumb";
import EditNews from "@/components/news/edit";
import MasterLayout from "@/masterLayout/MasterLayout";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const description = searchParams.get('description');

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Edit News' page='Edit News' />

        <EditNews id={id} title={title} description={description} />   
      </MasterLayout> 
    </>
  );
};

export default Page;