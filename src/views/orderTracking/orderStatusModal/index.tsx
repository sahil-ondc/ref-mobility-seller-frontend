import { OrderHeadingWrapper, Heading } from 'styles/views/orderTracking'
import { IImageData } from 'interfaces/views'

const OrderStatusModal = ({ title }: IImageData) => {
  return (
    // <OrderStatusWrapper>
    //   <OrderHeadingWrapper>
    //     <Heading>Package Picked Up</Heading>
    //     <SubTitle>Package Picked Up from chennai airport Hub</SubTitle>
    //   </OrderHeadingWrapper>
    //   <OrderImageWrapper>
    //     <img src={imgSrc} alt="product-image" />
    //   </OrderImageWrapper>
    // </OrderStatusWrapper>
    <>
      <OrderHeadingWrapper>
        <Heading>{title}</Heading>
        {/* <SubTitle>Package Picked Up from chennai airport Hub</SubTitle> */}
      </OrderHeadingWrapper>
    </>
  )
}

export default OrderStatusModal
