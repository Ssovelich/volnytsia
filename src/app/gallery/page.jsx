import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import GalleryTabs from "../../components/GalleryTabs/GalleryTabs";
import { galleryData } from "@/data/galleryPhotoData";

export const metadata = {
  title: "Галерея | Княжа Вольниця",
  description: "Фотографії та відео з концертів та заходів хору",
};

const Gallery = () => {
  return (
    <main>
      <SectionWrapper title={"Наші миті і подорожі"}>
        <p style={{ marginBottom: "48px" }}>{galleryData.topParagraph}</p>
        <GalleryTabs />
        <p style={{ marginTop: "48px" }}>{galleryData.bottomParagraph}</p>
      </SectionWrapper>
    </main>
  );
};

export default Gallery;
