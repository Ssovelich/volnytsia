import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import HomeContent from "@/components/HomeContent/HomeContent";
import PageLoader from "@/components/PageLoader/PageLoader";

export const metadata = {
  title: "Княжа Вольниця | Народний аматорський хор",
  description:
    "Гловна сторінка сайту народного аматорського хору “Княжа Вольниця”.",
};

const HomePage = () => {
  return (
    <main>
      <SectionWrapper
        title={
          <>
            Вітаємо на сторінці <span className="brTablet"></span>
            народного аматорського хору “Княжа Вольниця”!
          </>
        }
      >
        <HomeContent />
        <PageLoader/>
      </SectionWrapper>
    </main>
  );
};

export default HomePage;
