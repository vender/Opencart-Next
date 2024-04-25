import { ImageResponse } from 'next/og'
import { siteInfo } from '#/lib'; 

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default async function Icon() {
    const siteInfoData = await siteInfo();
  return new ImageResponse(
    (
      <img src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${siteInfoData?.siteIcon}`} />
    ),
    {...size}
  )
}