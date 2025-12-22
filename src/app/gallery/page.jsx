import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import GalleryTabs from "../../components/GalleryTabs/GalleryTabs";
import { galleryData } from "@/data/galleryData";
import Banner from "@/components/GalleryTabs/Banner/Banner";

export const metadata = {
  title: "Галерея",
  description: "Фотографії та відео з концертів та заходів хору",
};

const Gallery = () => {
  return (
    <main>
      <SectionWrapper title={"Наші миті і подорожі"}>
         <Banner />
        <p style={{ marginBlock: "48px" }}>{galleryData.topParagraph}</p>
        <GalleryTabs />
        <p style={{ marginTop: "48px" }}>{galleryData.bottomParagraph}</p>
      </SectionWrapper>
    </main>
  );
};

export default Gallery;
