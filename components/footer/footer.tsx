"use client"
import Widgets from "./widgets";
import Copyright from "./copyright";
import { footer } from "./data";
const { payment }:any = footer;

export default function Footer({infoPages, widgets}:any) {
    // const widgets = groupBy(data, 'footer_id');

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
      <footer className="border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
        <Widgets widgets={[...widgets, pageList]} />
        <Copyright payment={payment} />
      </footer>
    )
}