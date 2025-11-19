import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import HomeContent from "@/components/HomeContent/HomeContent";

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
      </SectionWrapper>
    </main>
  );
};

export default HomePage;
