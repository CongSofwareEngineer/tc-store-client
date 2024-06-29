import React from 'react'
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'
import useMedia from '@/hook/useMedia'
// const AnyReactComponent = () => {
//   return (
//     <Tooltip title={<div>TC Store</div>}>
//       <MyImage
//         widthImage="30px"
//         heightImage="30px"
//         src={images.footer.iconGPS}
//         alt="gg-map-tsstore"
//       />
//     </Tooltip>
//   )
// }
const GgMap = () => {
  const { isMobile } = useMedia()
  const defaultProps = {
    center: {
      lat: 13.820217,
      lng: 107.751934,
    },
    zoom: 10,
  }

  return (
    <div style={{ height: '100%', width: '100%', minHeight: 200 }}>
      {/* <GoogleMapReact
        style={{ height: isMobile ? 200 : '100%', width: '100%' }}
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_API_KEY_GG_MAP }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        zoom={15}
      >
        <AnyReactComponent />
      </GoogleMapReact> */}
      <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY_GG_MAP}>
        <Map
          style={{
            height: isMobile ? 200 : '100%',
            width: '100%',
            minHeight: 200,
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          zoom={15}

          // gestureHandling={'greedy'}
          // disableDefaultUI={true}
        >
          <AdvancedMarker
            position={{ lat: 20, lng: 10 }}
            title={'AdvancedMarker with customized pin.'}
          >
            <Pin
              background={'#22ccff'}
              borderColor={'#1e89a1'}
              glyphColor={'#0f677a'}
            ></Pin>
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  )
}

export default GgMap
