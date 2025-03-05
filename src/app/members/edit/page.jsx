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
  const name = searchParams.get('name');
  const designation = searchParams.get('designation');
  const email = searchParams.get('email');

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Edit Member' page='Edit member' />

        <EditMember id={id} name={name} designation={designation} email={email} />   
      </MasterLayout> 
    </>
  );
};

export default Page;