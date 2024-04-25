"use client"
import { YMaps, Map, Clusterer, Placemark, FullscreenControl, GeolocationControl, SearchControl } from '@pbe/react-yandex-maps';


export default function YamapWrapper({locations}:any) {
    
  return (
        <YMaps query={{ apikey: 'e65cc82e-fcae-451f-87ce-0a22bcd9f2ef', suggest_apikey: '26ff3f64-a214-4bbd-af28-bb13c3272ab7' }}>
            <Map defaultState={{ center: [53.66, 75.06], zoom: 3 }} width="100%" height="500px" >
                <Clusterer
                    options={{
                        preset: "islands#invertedVioletClusterIcons",
                        groupByCoordinates: false,
                    }}
                    >
                    {locations && locations.map((item:any) => (
                        <Placemark
                            key={item.location_id}
                            modules={["geoObject.addon.balloon"]}
                            geometry={item.geocode.split(',')}
                            properties={{
                                balloonContentHeader: `${item.name}`,
                                balloonContentBody: `${item.address}`,
                                balloonContentFooter: `Режим работы: ${item.open}`
                            }}
                        />
                    ))}
                </Clusterer>
                <FullscreenControl />
                <GeolocationControl options={{ float: "left" }} />
                <SearchControl options={{ float: "right" }} />
            </Map>
        </YMaps>
  )
}
