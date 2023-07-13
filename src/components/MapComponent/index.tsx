import React, { useEffect } from 'react'
import { mappls } from 'mappls-web-maps'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { OrderStateWrapper, MapLocationImage } from 'styles/views/driverFlowHome'

const MapComponent = () => {
  const { refetch, data: mmiToken } = useGet('mmi-token', `${APIS.MMI_TOKEN}`)

  useEffect(() => {
    refetch()
  }, [refetch])

  //mapples-map-myindia
  const mapMyIndia = async () => {
    const mapProps = {
      center: [28.655298086899677, 77.2385025013686],
      traffic: false,
      geolocation: true,
      zoomControl: false,
    }
    const loadMap = async () => {
      const map = await new mappls().Map({ id: 'map', properties: mapProps })

      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          const coor = { lat: latitude, lng: longitude }
          map.setCenter([coor.lat, coor.lng])
          const marker = new mappls().Marker({
            map: map,
            position: coor,
            fitbounds: true,
          })
          map.addListener('click', function (click: { lngLat: { lat: any; lng: any } }) {
            const { lat, lng } = click.lngLat
            const newCoor = { lat, lng }
            marker.setPosition(newCoor)
          })
        })
      }
    }

    if (mmiToken?.access_token) {
      const script = document.createElement('script')
      script.src = `https://apis.mappls.com/advancedmaps/api/${mmiToken.access_token}/map_sdk?v=3.0&layer=vector`
      script.type = 'text/javascript'
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        loadMap()
      }

      return () => {
        document.head.removeChild(script)
      }
    }
  }

  useEffect(() => {
    mapMyIndia()
  }, [mmiToken?.access_token])

  return (
    <OrderStateWrapper>
      <MapLocationImage id="map" />
    </OrderStateWrapper>
  )
}

export default MapComponent
