import AboutTabs from "./AboutTabs";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";

export const metadata = {
  title: "Княжа Вольниця | Про нас",
  description: "Інформація про керівників та учасників хору",
};

const About = () => {
  return (
    <main>
      <SectionWrapper title={"Крізь роки до сучасності"}>
        <AboutTabs />
      </SectionWrapper>
    </main>
  );
};

export default About;
