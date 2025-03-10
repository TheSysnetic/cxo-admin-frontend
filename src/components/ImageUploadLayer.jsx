import BasicUpload from "./child/BasicUpload";
import ImageUpload from "./members/ImageUpload";
import UploadWithImagePreview from "./child/UploadWithImagePreview";
import UploadWithImagePreviewList from "./magazine/upload-file";

const ImageUploadLayer = () => {
  return (
    <div className='row gy-4'>
      {/* BasicUpload */}
      <BasicUpload />

      {/* ImageUpload */}
      <ImageUpload />

      {/* UploadWithImagePreview */}
      <UploadWithImagePreview />

      {/* UploadWithImagePreviewList */}
      <UploadWithImagePreviewList />
    </div>
  );
};

export default ImageUploadLayer;
