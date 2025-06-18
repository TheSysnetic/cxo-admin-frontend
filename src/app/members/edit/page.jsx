"use client"
import Breadcrumb from "@/components/Breadcrumb";
import EditMember from "@/components/members/edit";
import MasterLayout from "@/masterLayout/MasterLayout";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Edit Member' page='Edit member' />

        <EditMember id={id} />   
      </MasterLayout> 
    </>
  );
};

export default Page;