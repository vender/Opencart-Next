import Widgets from "./widgets";
import Copyright from "./copyright";

export default function Footer({infoPages, widgets}:any) {

    let pageList = {
      footer_id: 5,
      name: "Информация",
      items: infoPages && infoPages.map((page:any)=>{
        return {
          id: page.information_id,
          title: page.title,
          link: `/info/${page.information_id}`,
          bottom: page.bottom
        }
      }).filter((item:any) => item?.bottom)
    };

    return (
      <footer className="bg-[#f6f2ef] border-b-4 border-heading md:mt-11 pt-[50px]">
        <Widgets widgets={[...widgets, pageList]} />
        <Copyright />
      </footer>
    )
}