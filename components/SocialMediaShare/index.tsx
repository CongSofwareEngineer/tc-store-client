import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  // TelegramShareButton
} from 'react-share'
const url = 'https://tcstore.vercel.app/shop'
const title = 'TC Store - Uy tín khách hàng là chất lượng chúng tôi'
const SocialMediaShare = () => {
  return (
    <div className={'absolute opacity-0 z-[-1]'}>
      <FacebookShareButton url={url} title={title}>
        <></>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <></>
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <></>
      </LinkedinShareButton>
      <EmailShareButton url="hodiencong2000@gmail.com" title="CEO TC Store">
        <></>
      </EmailShareButton>
      {/* <TelegramShareButton url=''>

      </TelegramShareButton> */}
    </div>
  )
}

export default SocialMediaShare
